using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly IProductCategoryRepository _productCategoryRepsoitory;

        public ProductCategoryService(IProductCategoryRepository productCategoryRepository)
        {
            _productCategoryRepsoitory = productCategoryRepository;
        }
        public List<ProductCategoryDTO> GetProductCategories()
        {
            List<ProductCategory> productCategories = _productCategoryRepsoitory.GetProductCategories();
            List<ProductCategoryDTO> productCategoryDTOs = new();
            ProductCategoryDTO productCategoryDTO;

            foreach (ProductCategory productCategory in productCategories)
            {
                productCategoryDTO = new();
                productCategoryDTO.Id = productCategory.Id;
                productCategoryDTO.CategoryName = productCategory.CategoryName;

                productCategoryDTOs.Add(productCategoryDTO);
            }
            
            return productCategoryDTOs;
        }
    }
}
