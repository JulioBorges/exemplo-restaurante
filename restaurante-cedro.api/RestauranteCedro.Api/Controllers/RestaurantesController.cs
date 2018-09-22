using Microsoft.AspNetCore.Mvc;
using RestauranteCedro.Api.Contrato;
using RestauranteCedro.Data;
using RestauranteCedro.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RestauranteCedro.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantesController : ControllerGenerico<Restaurante>
    {
        public RestaurantesController(RestauranteContext contexto)
            : base (contexto)
        {
        }

        [HttpGet("")]
        public async Task<IEnumerable<Restaurante>> GetRestaurantes()
        {
            return await RetornarEntidades();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurante([FromRoute] int id)
        {
            return await RetornarEntidade(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurante([FromRoute] int id, [FromBody] Restaurante restaurante)
        {
            return await AtualizarEntidade(id, restaurante);
        }

        [HttpPost]
        public async Task<IActionResult> PostRestaurante([FromBody] Restaurante restaurante)
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