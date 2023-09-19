using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IProductService
    {
        public List<ProductDTO> GetProducts();
    }
}
