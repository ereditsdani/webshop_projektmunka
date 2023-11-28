using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class UsersRepository : IUsersRepository
    {
        private readonly WebshopContext _webshopContext;
        public UsersRepository(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }

        public void changeAdminStateForUser(List<Users> users)
        {
            Users user;
            foreach (var item in users)
            {
                user = _webshopContext.Users.Where(x => x.Id == item.Id).FirstOrDefault();
                if (user.Admin == true)
                {
                    user.Admin = false;
                }
                else
                {
                    user.Admin = true;
                }
            }
            _webshopContext.SaveChanges();
        }

        public void deleteUser(List<Users> users)
        {
            Users user;
            foreach (var item in users)
            {
                user = _webshopContext.Users.Where(x=> x.Id == item.Id).FirstOrDefault();
                user.Active = false;
            }
            _webshopContext.SaveChanges();
        }

        public void editUser(Users user)
        {
            try
            {
                Users newUser = _webshopContext.Users.Where(x => x.Id == user.Id).FirstOrDefault();
                newUser.Username = user.Username;
                newUser.Email = user.Email;
                newUser.PostalNumber = user.PostalNumber;
                newUser.Address = user.Address;
                newUser.PhoneNumber = user.PhoneNumber;
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Users getUserById(int userId)
        {
            try
            {
                return _webshopContext.Users.Where(x => x.Id == userId).FirstOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Users> GetUsers()
        {
            try
            {
                return _webshopContext.Users.Where(x=> x.Active == true).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void registerUser(Users user)
        {
            try
            {
                _webshopContext.Users.Add(user);
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
