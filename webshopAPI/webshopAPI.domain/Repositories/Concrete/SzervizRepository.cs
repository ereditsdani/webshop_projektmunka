﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;

namespace webshopAPI.domain.Repositories.Concrete
{
    public class SzervizRepository : ISzervizRepository
    {
        private readonly WebshopContext _webshopContext;
        public SzervizRepository(WebshopContext webshopContext)
        {
            _webshopContext = webshopContext;
        }

        public List<Service> GetServices()
        {
            try
            {
                List<Service> services = _webshopContext.Service.ToList();

                return services;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void saveSzervizForm(Service szerviz)
        {
            try
            {
                _webshopContext.Service.Add(szerviz);
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void solveService(List<Service> services)
        {
            try
            {
                Service service;
                foreach (var item in services)
                {
                    service = _webshopContext.Service.Where(x => x.Id == item.Id).FirstOrDefault();
                    service.Solved = true;
                }
                _webshopContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
