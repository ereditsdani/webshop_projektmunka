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
    }
}
