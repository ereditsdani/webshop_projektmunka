using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public void saveOrder(List<ProductDTO> products)
        {
            List<Product> returnProducts = new();
            Product seged;

            foreach (var item in products)
            {
                seged = new();
                seged.Id = item.Id;
                seged.ProductName = item.ProductName;
                seged.ProductDescription = item.ProductDescription;
                seged.Price = item.Price;
                seged.Discount = item.Discount;
                seged.ImageUrl = item.ImageUrl;
                seged.CategoryId = item.ProductCategory.Id;
                seged.VendorId = item.ProductVendor.Id;
                seged.Quantity = item.Quantity;
                seged.OurChoice = item.OurChoice;
                seged.Active = true;
                returnProducts.Add(seged);
            }

            _orderRepository.saveOrder(returnProducts);
        }
    }
}
