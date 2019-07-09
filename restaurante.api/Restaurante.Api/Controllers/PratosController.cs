using Microsoft.AspNetCore.Mvc;
using Restaurante.Api.Contrato;
using Restaurante.Data;
using Restaurante.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurante.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PratosController : ControllerGenerico<Prato>
    {
        public PratosController(RestauranteContext contexto)
            : base(contexto)
        {
        }

        [HttpGet("")]
        public async Task<IEnumerable<Prato>> GetPratos()
        {
            return await RetornarEntidades(includes: "Restaurante");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrato([FromRoute] int id)
        {
            return await RetornarEntidade(id, includes: "Restaurante");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrato([FromRoute] int id, [FromBody] Prato prato)
        {
            return await AtualizarEntidade(id, prato);
        }

        [HttpPost]
        public async Task<IActionResult> PostPrato([FromBody] Prato prato)
        {
            return await InserirEntidade(prato, "GetPrato");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrato([FromRoute] int id)
        {
            return await ExcluirEntidade(id);
        }
    }
}