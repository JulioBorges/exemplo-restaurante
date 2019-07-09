using Microsoft.EntityFrameworkCore;
using Restaurante.Data.Entities;

namespace Restaurante.Data
{
    public class RestauranteContext : DbContext
    {
        public RestauranteContext(DbContextOptions<RestauranteContext> options)
            : base(options)
        { }


        public DbSet<Entities.Restaurante> Restaurantes { get; set; }

        public DbSet<Prato> Pratos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Entities.Restaurante>()
              .HasMany(o => o.Pratos)
              .WithOne(o => o.Restaurante)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
