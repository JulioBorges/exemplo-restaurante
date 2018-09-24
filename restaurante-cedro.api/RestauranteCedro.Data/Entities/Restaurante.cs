using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteCedro.Data.Entities
{
    [Table("Restaurante")]
    public class Restaurante : DefaultEntity
    {
        public Restaurante()
        {
            Pratos = new List<Prato>();
        }

        [Column("NomeRestaurante")]
        [Required]
        public string Nome { get; set; }

        [JsonIgnore]
        public virtual List<Prato> Pratos { get; set; }
    }
}
