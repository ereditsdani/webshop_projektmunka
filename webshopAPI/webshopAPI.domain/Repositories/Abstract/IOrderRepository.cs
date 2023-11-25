using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface IOrderRepository
    {
        public void saveOrder(List<Product> products, string userId, string shippingMethod, string paymentMethod);
        public void saveOrderItems(List<Product> products);
        public bool doesOrderExist(int orderId);
        public List<Order> getOrders();
        public List<OrderItems> GetOrderItemsByOrderId(int orderId);
        public void deleteOrders(List<Order> orders);
    }
}
