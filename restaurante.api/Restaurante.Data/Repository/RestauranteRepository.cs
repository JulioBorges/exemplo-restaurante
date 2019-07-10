namespace Restaurante.Data.Repository
{
    public class RestauranteRepository : BaseRepository<Domain.Restaurante>
    {
        public RestauranteRepository(RestauranteContext context) : base(context)
        {
        }
    }
}
