using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class OrderRepository : IOrderRepository
    {
        private readonly WebshopContext _webshopContext;

        public OrderRepository(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }

        public bool doesOrderExist(int orderId)
        {
            try
            {
                Order order = _webshopContext.Order.Where(x => x.Id == orderId).FirstOrDefault();

                if (order != null)
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<OrderItems> GetOrderItemsByOrderId(int orderId)
        {
            try
            {
                return _webshopContext.OrderItems.Where(x => x.OrderId == orderId).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Order> getOrders()
        {
            try
            {
                return _webshopContext.Order.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void saveOrder(List<Product> products)
        {
            Order order = new Order();
            order.UserId = 0;
            order.Timestamp = DateTime.Now;
            order.ShipmentMethod = "todo";
            order.PaymentMethod = "todo";

            _webshopContext.Order.Add(order);
            _webshopContext.SaveChanges();

            saveOrderItems(products);
        }

        public void saveOrderItems(List<Product> products)
        {
            Order lastOrder = _webshopContext.Order.OrderByDescending(x => x.Timestamp).FirstOrDefault();
            OrderItems orderItem;
            foreach (var item in products)
            {
                orderItem = new();
                orderItem.ProductId = item.Id;
                orderItem.OrderId = lastOrder.Id;
                orderItem.Quantity = item.Quantity;
                _webshopContext.OrderItems.Add(orderItem);
            }

            _webshopContext.SaveChanges();
        }
    }
}
