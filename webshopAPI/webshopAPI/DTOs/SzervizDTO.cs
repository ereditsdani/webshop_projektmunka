namespace webshopAPI.DTOs
{
    public class SzervizDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string ErrorDescription { get; set; }
        public int OrderNumber { get; set; }
        public bool? Solved { get; set; }
    }
}
