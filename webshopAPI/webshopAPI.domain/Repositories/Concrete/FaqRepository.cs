using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class FaqRepository : IFaqRepository
    {
        private readonly WebshopContext _webshopContext;

        public FaqRepository(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }

        public void DeleteFaqs(List<Faq> faqs)
        {
            try
            {
                Faq deleteFaq;
                foreach (var item in faqs)
                {
                    deleteFaq = _webshopContext.Faq.Where(x => x.Id == item.Id).FirstOrDefault();
                    _webshopContext.Faq.Remove(deleteFaq);
                }
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Faq> GetFaqs()
        {
            try
            {
                List<Faq> faqs = _webshopContext.Faq.ToList();
                return faqs;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void SaveNewFaq(Faq faq)
        {
            try
            {
                _webshopContext.Faq.Add(faq);
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
