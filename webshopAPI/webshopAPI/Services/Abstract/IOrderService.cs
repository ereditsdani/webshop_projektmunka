using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IOrderService
    {
        public void saveOrder(List<ProductDTO> products, string userId, string shippingMethod, string paymentMethod);
        public bool doesOrderExist(int orderId);
        public List<OrderDTO> getOrders();
        public void deleteOrders(List<OrderDTO> orders);
    }
}
