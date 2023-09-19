using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class VendorRepsoitory : IVendorRepository
    {
        private readonly WebshopContext _webshopContext;

        public VendorRepsoitory(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }

        public Vendor GetVendorById(int vendorId)
        {
            try
            {
                Vendor vendor = _webshopContext.Vendor.Where(x => x.Id == vendorId).FirstOrDefault();
                return vendor;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Vendor> GetVendors()
        {
            try
            {
                List<Vendor> vendors = _webshopContext.Vendor.ToList();
                return vendors;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
