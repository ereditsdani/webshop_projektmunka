namespace webshopAPI.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Username { get; set; }

        public string PhoneNumber { get; set; }

        public string PostalNumber { get; set; }

        public string Address { get; set; }

        public bool Admin { get; set; }

        public bool Active { get; set; }

        public string AvatarUrl { get; set; }
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}
