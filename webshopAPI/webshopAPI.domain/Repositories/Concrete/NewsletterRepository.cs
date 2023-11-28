using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class NewsletterRepository : INewsletterRepository
    {
        private readonly WebshopContext _webshopContext;

        public NewsletterRepository(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }

        public void deletePromotionMail(List<PromotionMail> promotionMails)
        {
            try
            {
                PromotionMail promotionMail;
                foreach (var item in promotionMails)
                {
                    promotionMail = _webshopContext.PromotionMail.Where(x => x.Id == item.Id).FirstOrDefault();
                    _webshopContext.PromotionMail.Remove(promotionMail);
                }
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<PromotionMail> getPromotionMails()
        {
            try
            {
                return _webshopContext.PromotionMail.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void savePromotionMail(PromotionMail promotionMail)
        {
            try
            {
                _webshopContext.PromotionMail.Add(promotionMail);
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
