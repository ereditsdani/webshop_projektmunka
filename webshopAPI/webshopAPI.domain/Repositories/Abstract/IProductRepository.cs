using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface IProductRepository
    {
        public List<Product> GetProducts();
        public void SaveNewProduct(Product product);
        public void EditProduct(Product product);
        public void DeleteProduct(List<Product> products);
        public Product GetProductById(int productId);
    }
}
