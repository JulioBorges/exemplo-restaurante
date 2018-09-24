using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestauranteCedro.Data;
using RestauranteCedro.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestauranteCedro.Api.Contrato
{
    public class ControllerGenerico<T> : ControllerBase
        where T : DefaultEntity
    {
        protected RestauranteContext _contexto;

        public ControllerGenerico(RestauranteContext contexto)
        {
            _contexto = contexto;
        }

        protected async Task<IEnumerable<T>> RetornarEntidades(params string [] includes)
        {
            var dados = await PrepararQuery(includes).AsNoTracking().ToListAsync();
            return dados;
        }

        public async Task<IActionResult> RetornarEntidade(int id, params string[] includes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entidade = await PrepararQuery(includes).AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == id);

            if (entidade == null)
                return NotFound();

            return Ok(entidade);
        }

        public async Task<IActionResult> AtualizarEntidade(int id, T entidade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entidade.Id)
            {
                return BadRequest();
            }

            _contexto.Entry(entidade).State = EntityState.Modified;

            try
            {
                await _contexto.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await EntidadeExistente(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> InserirEntidade(T entidade, string acaoGet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _contexto.Add(entidade);
            await _contexto.SaveChangesAsync();

            return CreatedAtAction(acaoGet, new { id = entidade.Id }, entidade);
        }

        public async Task<IActionResult> ExcluirEntidade(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entidade = await _contexto.Set<T>().FindAsync(id);
            if (entidade == null)
            {
                return NotFound();
            }

            _contexto.Remove(entidade);
            await _contexto.SaveChangesAsync();

            return Ok(entidade);
        }

        private async Task<bool> EntidadeExistente(int id)
        {
            return await _contexto.Set<T>().AnyAsync(e => e.Id == id);
        }

        private IQueryable<T> PrepararQuery(params string[] includes)
        {
            IQueryable<T> query = _contexto.Set<T>();

            if (includes != null &&
                includes.Length > 0)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            return query;
        }
    }
}
