using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface IUsersRepository
    {
        List<Users> GetUsers();
        public void registerUser(Users user);
        Users getUserById(int userId);
        public void deleteUser(List<Users> users);
        public void changeAdminStateForUser(List<Users> users);
    }
}
