using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Restaurante.Application.Services;
using Restaurante.Core.Repository;
using Restaurante.Core.Services;
using Restaurante.Data;
using Restaurante.Data.Domain;
using Restaurante.Data.Repository;

namespace Restaurante.Api.IoC
{
    public static class IoCConfiguration
    {
        public static void ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<RestauranteContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("RestauranteContext"))
            );
        }

        public static void ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<IRepository<Prato>, PratoRepository>();
            services.AddScoped<IRepository<Data.Domain.Restaurante>, RestauranteRepository>();
        }

        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IService<Prato>, PratoService>();
            services.AddScoped<IService<Data.Domain.Restaurante>, RestauranteService>();
        }
    }
}
