using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface IOrderRepository
    {
        public void saveOrder(List<Product> products);
        public void saveOrderItems(List<Product> products);
    }
}
