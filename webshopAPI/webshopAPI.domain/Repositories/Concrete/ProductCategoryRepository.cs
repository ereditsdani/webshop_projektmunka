using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {
        private readonly WebshopContext _webshopContext;

        public ProductCategoryRepository(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }
        public List<ProductCategory> GetProductCategories()
        {
            try
            {
                List<ProductCategory> productCategories = _webshopContext.ProductCategory.ToList();

                return productCategories;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
