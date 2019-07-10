using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurante.Core.Domain;
using Restaurante.Core.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Api.Contrato
{
    public class ControllerGenerico<TEntity> : ControllerBase
        where TEntity : DefaultEntity
    {
        protected readonly IService<TEntity> _servico;

        public ControllerGenerico(IService<TEntity> servico)
        {
            _servico = servico;
        }

        protected async Task<IEnumerable<TEntity>> RetornarEntidades(params string [] includes)
        {
            var dados = await PrepararQuery(includes).AsNoTracking().ToListAsync();
            return dados;
        }

        public async Task<IActionResult> RetornarEntidade(int id, params string[] includes)
        {
            var entidade = await PrepararQuery(includes).AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == id);

            if (entidade == null)
                return NotFound();

            return Ok(entidade);
        }

        public async Task<IActionResult> AtualizarEntidade(int id, TEntity entidade)
        {
            if (id != entidade.Id)
                return BadRequest();

            _servico.Update(entidade);

            try
            {
                await _servico.SaveChangesAsync();
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

        public async Task<IActionResult> InserirEntidade(TEntity entidade, string acaoGet)
        {
            _servico.Add(entidade);
            await _servico.SaveChangesAsync();

            return CreatedAtAction(acaoGet, new { id = entidade.Id }, entidade);
        }

        public async Task<IActionResult> ExcluirEntidade(int id)
        {
            var entidade = _servico.GetById(id);
            
            if (entidade == null)
                return NotFound();

            _servico.Remove(entidade.Id);
            await _servico.SaveChangesAsync();

            return Ok(entidade);
        }

        private async Task<bool> EntidadeExistente(int id)
        {
            return await _servico.GetAll().AnyAsync(e => e.Id == id);
        }

        private IQueryable<TEntity> PrepararQuery(params string[] includes)
        {
            IQueryable<TEntity> query = _servico.GetAll();

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
