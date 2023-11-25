using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface INewsletterRepository
    {
        public List<PromotionMail> getPromotionMails();
        public void savePromotionMail(PromotionMail promotionMail);
        public void deletePromotionMail(List<PromotionMail> promotionMails);
    }
}
