using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurante.Api.Contrato;
using Restaurante.Data;
using Restaurante.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantesController : ControllerGenerico<Data.Entities.Restaurante>
    {
        public RestaurantesController(RestauranteContext contexto)
            : base (contexto)
        {
        }

        [HttpGet("")]
        public async Task<IEnumerable<Data.Entities.Restaurante>> GetRestaurantes()
        {
            return await RetornarEntidades();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurante([FromRoute] int id)
        {
            return await RetornarEntidade(id);
        }

        [HttpGet("pesquisa/{nome}")]
        public async Task<IActionResult> GetRestaurante(string nome)
        {
            var restaurantes = await _contexto.Restaurantes
                .Where(rest => rest.Nome.ToLower().Contains(nome.ToLower()))
                .ToListAsync();

            return Ok(restaurantes);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurante([FromRoute] int id, [FromBody] Data.Entities.Restaurante restaurante)
        {
            return await AtualizarEntidade(id, restaurante);
        }

        [HttpPost]
        public async Task<IActionResult> PostRestaurante([FromBody] Data.Entities.Restaurante restaurante)
        {
            return await InserirEntidade(restaurante, "GetRestaurante");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurante([FromRoute] int id)
        {
            return await ExcluirEntidade(id);
        }
    }
}