using Restaurante.Data.Domain;

namespace Restaurante.Data.Repository
{
    public class PratoRepository : BaseRepository<Prato>
    {
        public PratoRepository(RestauranteContext context) : base(context)
        {
        }
    }
}
