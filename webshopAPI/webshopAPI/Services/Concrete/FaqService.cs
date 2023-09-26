using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class FaqService : IFaqService
    {
        private readonly IFaqRepository _faqRepository;

        public FaqService(IFaqRepository faqRepository)
        {
            _faqRepository = faqRepository;
        }
        public List<FaqDTO> GetFaqs()
        {
            try
            {
                List<Faq> faqs = _faqRepository.GetFaqs();
                List<FaqDTO> faqDTOs = new List<FaqDTO>();
                FaqDTO faqDTO;

                foreach (var item in faqs)
                {
                    faqDTO = new();

                    faqDTO.Id = item.Id;
                    faqDTO.QuestionTitle = item.QuestionTitle;
                    faqDTO.Question = item.Question;
                    faqDTO.Answer = item.Answer;

                    faqDTOs.Add(faqDTO);
                }

                return faqDTOs;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
