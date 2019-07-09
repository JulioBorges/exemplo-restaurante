using Microsoft.EntityFrameworkCore;
using Restaurante.Data;

namespace Restaurante.Api
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
