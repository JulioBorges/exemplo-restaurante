using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteCedro.Data.Entities
{
    [Table("Restaurante")]
    public class Restaurante : DefaultEntity
    {
        [Column("NomeRestaurante")]
        [Required]
        public string Nome { get; set; }
    }
}
