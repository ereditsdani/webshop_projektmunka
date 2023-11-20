using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface IFaqService
    {
        public List<FaqDTO> GetFaqs();
        public void SaveNewFaq(FaqDTO faq);
        public void DeleteFaqs(List<FaqDTO> faqs);
    }
}
