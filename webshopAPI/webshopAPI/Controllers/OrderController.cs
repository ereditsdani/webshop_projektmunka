using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public List<OrderDTO> GetOrders()
        {
            try
            {
                return _orderService.getOrders();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public void SaveOrder([FromForm] string orderJson)
        {
            try
            {
                List<ProductDTO> products = JsonConvert.DeserializeObject<List<ProductDTO>>(orderJson);
                _orderService.saveOrder(products);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
