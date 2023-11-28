using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IUsersService
    {
        public List<UserDTO> GetUsers();

        public void registerUser(UserDTO user);
        public void editUser(UserDTO user);
        public void deleteUser(List<UserDTO> users);
        public void changeAdminStateForUser(List<UserDTO> users);
    }
}
