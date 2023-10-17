using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SzervizController : ControllerBase
    {
        private readonly ISzervizService _szervizService;
        private readonly IOrderService _orderService;

        public SzervizController(ISzervizService szervizService, IOrderService orderService)
        {
            _szervizService = szervizService;
            _orderService = orderService;
        }

        [HttpPost]
        public IActionResult saveSzervizForm([FromForm] string jsonData)
        {
            try
            {
                SzervizDTO szerviz = JsonConvert.DeserializeObject<SzervizDTO>(jsonData);
                bool doesOrderExist = _orderService.doesOrderExist(szerviz.OrderNumber);

                if (doesOrderExist)
                {
                    _szervizService.saveSzervizForm(szerviz);
                    return Ok();
                }
                return BadRequest("Hibás megrendelésszám!");
                //tood: majd ha működik az order akkor kell ezt megcsinálnom tovább
                //_szervizService.saveScrappingForm(scrappingForm);

                
            }
            catch (Exception e)
            {
                return BadRequest(e);
                throw;
            }
        }

        [HttpGet]
        public List<SzervizDTO> GetServices()
        {
            try
            {
                return _szervizService.getServices();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
