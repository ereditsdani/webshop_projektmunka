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

        public void DeleteProduct(List<Product> products)
        {
            try
            {
                Product product;
                foreach (var item in products)
                {
                    product = _webshopContext.Product.Where(x => x.Id == item.Id).FirstOrDefault();
                    product.Active = false;
                }
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Product GetProductById(int productId)
        {
            try
            {
                return _webshopContext.Product.Where(x => x.Id == productId).First();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Product> GetProducts()
        {
            try
            {
                List<Product> products = _webshopContext.Product.Where(x => x.Active == true).ToList();
                return products;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void SaveNewProduct(Product product)
        {
            try
            {
                product.Active = true;
                _webshopContext.Product.Add(product);
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
