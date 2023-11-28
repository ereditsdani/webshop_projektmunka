namespace webshopAPI.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }

        public DateTime Timestamp { get; set; }

        public UserDTO User { get; set; }

        public string PaymentMethod { get; set; }

        public string ShipmentMethod { get; set; }

        public List<OrderItemDTO> OrderItems { get; set; }
    }
}
