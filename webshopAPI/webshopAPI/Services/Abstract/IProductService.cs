using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IProductService
    {
        public List<ProductDTO> GetProducts();
        public void SaveNewProduct(ProductDTO product);
        public void DeleteProducts(List<ProductDTO> products);
    }
}
