using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface ISzervizRepository
    {
        public void saveSzervizForm(Service szerviz);
        public List<Service> GetServices();
    }
}
