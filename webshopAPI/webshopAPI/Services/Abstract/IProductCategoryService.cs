using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IProductCategoryService
    {
        public List<ProductCategoryDTO> GetProductCategories();

    }
}
