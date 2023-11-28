using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class VendorService : IVendorService
    {
        public readonly IVendorRepository _vendorRepsoitory;
        public VendorService(IVendorRepository vendorRepository)
        {
            _vendorRepsoitory = vendorRepository;
        }
        public List<VendorDTO> GetVendors()
        {
            try
            {
                List<Vendor> vendors = _vendorRepsoitory.GetVendors();
                List<VendorDTO> vendorDTOs = new List<VendorDTO>();
                VendorDTO vendorDTO;

                foreach (var vendor in vendors)
                {
                    vendorDTO = new();
                    vendorDTO.Id = vendor.Id;
                    vendorDTO.VendorName = vendor.VendorName;
                    vendorDTOs.Add(vendorDTO);
                }

                return vendorDTOs;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
