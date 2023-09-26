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

        public SzervizController(ISzervizService szervizService)
        {
            _szervizService = szervizService;
        }

        [HttpPost]
        public IActionResult saveSzervizForm([FromForm] string jsonData)
        {
            try
            {
                SzervizDTO scrappingForm = JsonConvert.DeserializeObject<SzervizDTO>(jsonData);
                //tood: majd ha működik az order akkor kell ezt megcsinálnom tovább
                //_szervizService.saveScrappingForm(scrappingForm);

                return Ok();
            }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}
