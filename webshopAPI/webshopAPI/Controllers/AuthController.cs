using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUsersService _usersService;

        public AuthController(IConfiguration configuration, IUsersService usersService)
        {
            _configuration = configuration;
            _usersService = usersService;
        }

        [HttpGet]
        public List<UserDTO> GetUsers()
        {
            try
            {
                return _usersService.GetUsers();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public void DeleteUsers([FromForm] string userJson)
        {
            try
            {
                List<UserDTO> users = JsonConvert.DeserializeObject<List<UserDTO>>(userJson);
                _usersService.deleteUser(users);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public void ChangeAdminStateForUser([FromForm] string userJson)
        {
            try
            {
                List<UserDTO> users = JsonConvert.DeserializeObject<List<UserDTO>>(userJson);
                _usersService.changeAdminStateForUser(users);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> Register([FromForm] string registerJson)
        {
            //meg ellenőrizni van e már ilyen
            UserDTO user = JsonConvert.DeserializeObject<UserDTO>(registerJson);

            List<UserDTO> users = _usersService.GetUsers();
            foreach (var item in users)
            {
                if (item.Username == user.Username)
                {
                    return BadRequest("Már létezik ilyen nevű felhasználó!");
                }
            }

            CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _usersService.registerUser(user);
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult<string>> Login(string requestPassword, string requestUsername)
        {
            List<UserDTO> users = _usersService.GetUsers();
            User CorrectUser = new User();
            UserDTO returnUser = new UserDTO();
            bool isUserCorrect = false;
            foreach (var user in users)
            {
                if (isUserCorrect == false)
                {
                    if (user.Username == requestUsername && VerifyPasswordHash(requestPassword, user.PasswordHash, user.PasswordSalt))
                    {
                        CorrectUser.Username = user.Username;
                        CorrectUser.PasswordHash = user.PasswordHash;
                        CorrectUser.PasswordSalt = user.PasswordSalt;
                        returnUser = user;
                        isUserCorrect = true;
                    }
                }
              
            }
            if (isUserCorrect == false)
            {
                return BadRequest("Hibás felhasználónév vagy jelszó!");
            }
            string token = CreateToken(CorrectUser);
            return Ok(returnUser);
        }

        [HttpPost]
        public void EditUser([FromForm] string userJson)
        {
            try
            {
                UserDTO user = JsonConvert.DeserializeObject<UserDTO>(userJson);
                _usersService.editUser(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
