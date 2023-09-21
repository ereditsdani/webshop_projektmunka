using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class ProductRepository : IProductRepository
    {
        private readonly WebshopContext _webshopContext;

        public ProductRepository(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }

        public List<Product> GetProducts()
        {
            try
            {
                List<Product> products = _webshopContext.Product.ToList();
                return products;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
