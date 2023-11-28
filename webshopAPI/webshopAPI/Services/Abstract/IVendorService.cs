using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IVendorService
    {
        public List<VendorDTO> GetVendors();
    }
}
