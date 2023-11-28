using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;

        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public void changeAdminStateForUser(List<UserDTO> users)
        {
            try
            {
                List<Users> newUsers = new List<Users>();
                Users seged;
                foreach (var item in users)
                {
                    seged = new();
                    seged.Id = item.Id;
                    newUsers.Add(seged);
                }
                _usersRepository.changeAdminStateForUser(newUsers);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void deleteUser(List<UserDTO> users)
        {
            try
            {
                List<Users> newUsers = new List<Users>();
                Users seged;
                foreach (var item in users)
                {
                    seged = new();
                    seged.Id = item.Id;
                    newUsers.Add(seged);
                }
                _usersRepository.deleteUser(newUsers);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void editUser(UserDTO user)
        {
            try
            {
                Users newUser = new Users();
                newUser.Id = user.Id;
                newUser.Username = user.Username;
                newUser.Email = user.Email;
                newUser.PostalNumber = user.PostalNumber;
                newUser.Address = user.Address;
                newUser.PhoneNumber = user.PhoneNumber;

                _usersRepository.editUser(newUser);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<UserDTO> GetUsers()
        {
            try
            {
                List<Users> users = _usersRepository.GetUsers();
                List<UserDTO> userDTOs = new List<UserDTO>();
                UserDTO userDTO;

                foreach (var item in users)
                {
                    userDTO = new();
                    userDTO.Id = item.Id;
                    userDTO.Email = item.Email;
                    userDTO.Password = item.Password;
                    userDTO.Username = item.Username;
                    userDTO.PhoneNumber = item.PhoneNumber;
                    userDTO.PostalNumber = item.PostalNumber;
                    userDTO.Address = item.Address;
                    userDTO.Admin = item.Admin;
                    userDTO.AvatarUrl = item.AvatarUrl;
                    userDTO.PasswordHash = item.PasswordHash;
                    userDTO.PasswordSalt = item.PasswordSalt;
                    userDTOs.Add(userDTO);
                }
                return userDTOs;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void registerUser(UserDTO user)
        {
            try
            {
                Users returnUser = new Users();

                returnUser.Email = user.Email;
                returnUser.Username = user.Username;
                returnUser.PhoneNumber = user.PhoneNumber;
                returnUser.PostalNumber = user.PostalNumber;
                returnUser.Address = user.Address;
                returnUser.Admin = user.Admin;
                returnUser.Active = user.Active;
                returnUser.PasswordHash = user.PasswordHash;
                returnUser.PasswordSalt = user.PasswordSalt;
                returnUser.AvatarUrl = user.AvatarUrl;
                returnUser.Active = true;
                returnUser.Admin = false;

                _usersRepository.registerUser(returnUser);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
