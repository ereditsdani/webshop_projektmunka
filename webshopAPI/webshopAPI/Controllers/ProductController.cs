using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public List<ProductDTO> GetProducts()
        {
            try
            {
                return _productService.GetProducts();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
