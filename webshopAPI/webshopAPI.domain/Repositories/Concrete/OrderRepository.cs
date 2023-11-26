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

        public void deleteOrders(List<Order> orders)
        {
            try
            {
                Order order;

                foreach (var item in orders)
                {
                    order = _webshopContext.Order.Where(x => x.Id == item.Id).FirstOrDefault();
                    order.Active = false;
                }
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
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
                List<Order> orders = _webshopContext.Order.Where(x => x.Active == true).ToList();

                List<Order> returnOrders = orders.ToList();
                returnOrders.Reverse();

                return returnOrders;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void saveOrder(List<Product> products, string userId, string shippingMethod, string paymentMethod)
        {
            Order order = new Order();
            order.UserId = Convert.ToInt32(userId); ;
            order.Timestamp = DateTime.Now;
            order.ShipmentMethod = shippingMethod;
            order.PaymentMethod = paymentMethod ;
            order.Active = true;

            _webshopContext.Order.Add(order);
            _webshopContext.SaveChanges();

            saveOrderItems(products);
        }

        public void saveOrderItems(List<Product> products)
        {
            Order lastOrder = _webshopContext.Order.OrderByDescending(x => x.Timestamp).FirstOrDefault();
            OrderItems orderItem;
            Product product;
            foreach (var item in products)
            {
                product = _webshopContext.Product.Where(x => x.Id == item.Id).FirstOrDefault();
                product.Quantity = product.Quantity - item.Quantity;
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
