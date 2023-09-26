using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IFaqService
    {
        public List<FaqDTO> GetFaqs();
    }
}
