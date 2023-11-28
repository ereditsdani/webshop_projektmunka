using Microsoft.AspNetCore.Mvc;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;
        public ProductCategoryController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        [HttpGet]
        public List<ProductCategoryDTO> GetProductCategories()
        {
            try
            {
                return _productCategoryService.GetProductCategories();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
