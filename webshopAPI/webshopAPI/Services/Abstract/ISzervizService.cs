using webshopAPI.DTOs;

namespace webshopAPI.Services.Abstract
{
    public interface ISzervizService
    {
        public void saveSzervizForm(SzervizDTO form);
        public List<SzervizDTO> getServices();
        public void solveService(List<SzervizDTO> services);
    }
}
