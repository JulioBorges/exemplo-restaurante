using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Restaurante.Data.Migrations
{
    [DbContext(typeof(RestauranteContext))]
    partial class RestauranteContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Restaurante.Data.Entities.Prato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdRestaurante");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnName("NomePrato");

                    b.Property<decimal>("Preco")
                        .HasColumnName("PrecoPrato");

                    b.HasKey("Id");

                    b.HasIndex("IdRestaurante");

                    b.ToTable("Prato");
                });

            modelBuilder.Entity("Restaurante.Data.Entities.Restaurante", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnName("NomeRestaurante");

                    b.HasKey("Id");

                    b.ToTable("Restaurante");
                });

            modelBuilder.Entity("Restaurante.Data.Entities.Prato", b =>
                {
                    b.HasOne("Restaurante.Data.Entities.Restaurante", "Restaurante")
                        .WithMany("Pratos")
                        .HasForeignKey("IdRestaurante")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
