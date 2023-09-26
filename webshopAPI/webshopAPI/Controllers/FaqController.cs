using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FaqController : ControllerBase
    {
        private readonly IFaqService _faqService;

        public FaqController(IFaqService faqService)
        {
            _faqService = faqService;
        }

        [HttpGet]
        public List<FaqDTO> GetFaqs()
        {
            try
            {
                return _faqService.GetFaqs();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
