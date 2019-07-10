using Restaurante.Core.Repository;
using Restaurante.Data.Domain;

namespace Restaurante.Application.Services
{
    public class PratoService : BaseService<Prato>
    {
        public PratoService(IRepository<Prato> repository) : base(repository)
        {
        }
    }
}
