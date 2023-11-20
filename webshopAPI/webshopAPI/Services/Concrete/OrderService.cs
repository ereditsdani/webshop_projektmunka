using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductCategoryRepository _productCategoryRepository;
        private readonly IVendorRepository _vendorRepository;

        public OrderService(IOrderRepository orderRepository, 
            IProductRepository productRepository, 
            IProductCategoryRepository productCategoryRepository,
            IVendorRepository vendorRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _productCategoryRepository = productCategoryRepository;
            _vendorRepository = vendorRepository;
        }

        public bool doesOrderExist(int orderId)
        {
            try
            {
                return _orderRepository.doesOrderExist(orderId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<OrderDTO> getOrders()
        {
            try
            {
                List<Order> orders = _orderRepository.getOrders();
                List<OrderDTO> orderDTOs = new List<OrderDTO>();
                OrderDTO orderDTO;
                List<OrderItems> orderItems = new List<OrderItems>();
                List<OrderItemDTO> orderItemDTOs = new List<OrderItemDTO>();
                OrderItemDTO orderItemDTO;
                Product product;
                Vendor vendor;
                ProductCategory productCategory;

                foreach (var item in orders)
                {
                    orderDTO = new();
                    orderDTO.Id = item.Id;
                    orderDTO.PaymentMethod = item.PaymentMethod;
                    orderDTO.Timestamp = item.Timestamp;
                    orderDTO.UserId = item.UserId;

                    orderItems = _orderRepository.GetOrderItemsByOrderId(orderDTO.Id);
                    orderItemDTOs = new();
                    foreach (var orderItem in orderItems)
                    {
                        orderItemDTO = new();
                        orderItemDTO.Id = orderItem.Id;
                        orderItemDTO.OrderId = orderItem.OrderId;
                        orderItemDTO.Quantity = orderItem.Quantity;
                        product = _productRepository.GetProductById(orderItem.ProductId);
                        orderItemDTO.Product = new();
                        orderItemDTO.Product.Id = product.Id;
                        orderItemDTO.Product.ImageUrl = product.ImageUrl;
                        orderItemDTO.Product.OrderAmount = orderItem.Quantity;
                        orderItemDTO.Product.Price = product.Price;
                        vendor = _vendorRepository.GetVendorById(product.VendorId);
                        orderItemDTO.Product.ProductVendor = new();
                        orderItemDTO.Product.ProductVendor.Id = vendor.Id;
                        orderItemDTO.Product.ProductVendor.VendorName = vendor.VendorName;
                        productCategory = _productCategoryRepository.GetProductCategoryById(product.CategoryId);
                        orderItemDTO.Product.ProductCategory = new();
                        orderItemDTO.Product.ProductCategory.Id = productCategory.Id;
                        orderItemDTO.Product.ProductCategory.CategoryName = productCategory.CategoryName;
                        orderItemDTO.Product.ProductDescription = product.ProductDescription;
                        orderItemDTO.Product.ProductName = product.ProductName;
                        orderItemDTO.Product.Discount = product.Discount;
                        orderItemDTO.Product.OurChoice = product.OurChoice;
                        orderItemDTOs.Add(orderItemDTO);
                    }
                    orderDTO.OrderItems = orderItemDTOs;
                    orderDTOs.Add(orderDTO);
                }
                return orderDTOs;
            }
            catch (Exception)
            {

                throw;
            }
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
                seged.Quantity = item.OrderAmount;
                seged.OurChoice = item.OurChoice;
                seged.Active = true;
                returnProducts.Add(seged);
            }

            _orderRepository.saveOrder(returnProducts);
        }
    }
}
