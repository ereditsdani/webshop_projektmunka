using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface IVendorRepository
    {
        public List<Vendor> GetVendors();
        public Vendor GetVendorById(int vendorId);
    }
}
