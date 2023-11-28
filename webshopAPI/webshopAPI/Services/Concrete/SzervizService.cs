using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class SzervizService : ISzervizService
    {
        private readonly ISzervizRepository _szervizRepository;

        public SzervizService(ISzervizRepository szervizRepository)
        {
            _szervizRepository = szervizRepository;
        }

        public List<SzervizDTO> getServices()
        {
            try
            {
                List<Service> services = _szervizRepository.GetServices();
                List<SzervizDTO> szervizDTOs = new List<SzervizDTO>();
                SzervizDTO szervizDTO;

                foreach (var item in services)
                {
                    szervizDTO = new();

                    szervizDTO.Id = item.Id;
                    szervizDTO.Email = item.Email;
                    szervizDTO.ErrorDescription = item.ErrorDescription;
                    szervizDTO.OrderNumber = item.OrderId;
                    szervizDTO.Solved = item.Solved;
                    szervizDTOs.Add(szervizDTO);
                }
                return szervizDTOs;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void saveSzervizForm(SzervizDTO form)
        {
            try
            {
                Service service = new();

                service.Email = form.Email;
                service.OrderId = Convert.ToInt32(form.OrderNumber);
                service.ErrorDescription = form.ErrorDescription;
                service.Solved = false;

                _szervizRepository.saveSzervizForm(service);
            }
            catch (Exception)
            {

                throw;
            }

        }

        public void solveService(List<SzervizDTO> services)
        {
            try
            {
                List<Service> serviceList = new List<Service>();
                Service service;

                foreach (var item in services)
                {
                    service = new();

                    service.Id = item.Id;
                    serviceList.Add(service);
                }

                _szervizRepository.solveService(serviceList);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
