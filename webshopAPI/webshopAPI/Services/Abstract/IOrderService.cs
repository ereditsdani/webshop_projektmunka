using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IOrderService
    {
        public void saveOrder(List<ProductDTO> products);
        public bool doesOrderExist(int orderId);
        public List<OrderDTO> getOrders();
    }
}
