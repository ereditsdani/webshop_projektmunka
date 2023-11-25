using webshopAPI.DTOs;

namespace webshopAPI.Services
{
    public interface INewsletterService
    {
        public List<PromotionMailDTO> getPromotionMails();
        public void savePromotionMail(PromotionMailDTO promotionMail);
        public void deletePromotionMail(List<PromotionMailDTO> promotionMails);
    }
}
