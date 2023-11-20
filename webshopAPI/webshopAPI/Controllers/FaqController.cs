using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        [HttpPost]
        public void SaveNewFaq([FromForm] string faqJson)
        {
            try
            {
                FaqDTO faq = JsonConvert.DeserializeObject<FaqDTO>(faqJson);
                _faqService.SaveNewFaq(faq);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public void DeleteFaqs([FromForm] string faqJson)
        {
            try
            {
                List<FaqDTO> faqs = JsonConvert.DeserializeObject<List<FaqDTO>>(faqJson);
                _faqService.DeleteFaqs(faqs);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
