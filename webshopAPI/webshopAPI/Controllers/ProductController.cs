using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        [HttpPost]
        public void SaveNewProduct([FromForm] string productJson)
        {
            try
            {
                ProductDTO product = JsonConvert.DeserializeObject<ProductDTO>(productJson);
                _productService.SaveNewProduct(product);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public void DeleteProducts([FromForm] string productJson)
        {
            try
            {
                List<ProductDTO> products = JsonConvert.DeserializeObject<List<ProductDTO>>(productJson);
                _productService.DeleteProducts(products);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
