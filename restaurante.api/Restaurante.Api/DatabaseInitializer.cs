using Microsoft.EntityFrameworkCore;
using RestauranteCedro.Data;

namespace RestauranteCedro.Api
{
    public class DatabaseInitializer
    {
        private readonly RestauranteContext _contexto;

        public DatabaseInitializer(RestauranteContext contexto)
        {
            _contexto = contexto;
        }

        public void Seed()
        {
            _contexto.Database.Migrate();
        }
    }
}
