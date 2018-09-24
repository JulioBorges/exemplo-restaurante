using Microsoft.EntityFrameworkCore;
using RestauranteCedro.Data.Entities;

namespace RestauranteCedro.Data
{
    public class RestauranteContext : DbContext
    {
        public RestauranteContext(DbContextOptions<RestauranteContext> options)
            : base(options)
        { }


        public DbSet<Restaurante> Restaurantes { get; set; }

        public DbSet<Prato> Pratos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Restaurante>()
              .HasMany(o => o.Pratos)
              .WithOne(o => o.Restaurante)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
