using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;

namespace webshopAPI.domain.Repositories.Abstract
{
    public interface IFaqRepository
    {
        public List<Faq> GetFaqs();
    }
}
