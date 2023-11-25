using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;

namespace webshopAPI.Services.Concrete
{
    public class NewsletterService : INewsletterService
    {
        private readonly INewsletterRepository _newsletterRepository;

        public NewsletterService(INewsletterRepository newsletterRepository)
        {
            _newsletterRepository = newsletterRepository;
        }

        public void deletePromotionMail(List<PromotionMailDTO> promotionMails)
        {
            try
            {
                List<PromotionMail> returnPromotionMails = new List<PromotionMail>();
                PromotionMail seged;

                foreach (var item in promotionMails)
                {
                    seged = new();
                    seged.Id = item.Id;
                    returnPromotionMails.Add(seged);
                }
                _newsletterRepository.deletePromotionMail(returnPromotionMails);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<PromotionMailDTO> getPromotionMails()
        {
            try
            {
                List<PromotionMail> promotionMails = _newsletterRepository.getPromotionMails();
                List<PromotionMailDTO> promotionMailDTOs = new List<PromotionMailDTO>();
                PromotionMailDTO promotionMailDTO;

                foreach (var item in promotionMails)
                {
                    promotionMailDTO = new();
                    promotionMailDTO.Id = item.Id;
                    promotionMailDTO.Name = item.Name;
                    promotionMailDTO.Email = item.Email;
                    promotionMailDTOs.Add(promotionMailDTO);
                }

                return promotionMailDTOs;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void savePromotionMail(PromotionMailDTO promotionMail)
        {
            try
            {
                PromotionMail newPromotionMail = new PromotionMail();
                newPromotionMail.Id = promotionMail.Id;
                newPromotionMail.Name = promotionMail.Name;
                newPromotionMail.Email = promotionMail.Email;

                _newsletterRepository.savePromotionMail(newPromotionMail);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
