using Restaurante.Core.Repository;

namespace Restaurante.Application.Services
{
    public class RestauranteService : BaseService<Data.Domain.Restaurante>
    {
        public RestauranteService(IRepository<Data.Domain.Restaurante> repository) : base(repository)
        {
        }
    }
}
