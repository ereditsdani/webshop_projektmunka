using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using webshopAPI.DTOs;
using webshopAPI.Services;

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NewsletterController : ControllerBase
    {
        private readonly INewsletterService _newsletterService;
        public NewsletterController(INewsletterService newsletterService)
        {
            _newsletterService = newsletterService;
        }

        [HttpGet]
        public List<PromotionMailDTO> GetNewsletters()
        {
            try
            {
                return _newsletterService.getPromotionMails();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public void SaveNewPromotionMail([FromForm] string promotionMailJson)
        {
            try
            {
                PromotionMailDTO promotionMail = JsonConvert.DeserializeObject<PromotionMailDTO>(promotionMailJson);
                _newsletterService.savePromotionMail(promotionMail);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public void DeletePromotionMail([FromForm] string mailJson)
        {
            try
            {
                List<PromotionMailDTO> mails = JsonConvert.DeserializeObject<List<PromotionMailDTO>>(mailJson);
                _newsletterService.deletePromotionMail(mails);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
