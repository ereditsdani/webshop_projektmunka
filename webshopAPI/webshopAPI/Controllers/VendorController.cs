using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet]
        public List<VendorDTO> GetVendors()
        {
            try
            {
                return _vendorService.GetVendors();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
