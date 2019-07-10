using Restaurante.Core.Domain;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Core.Repository
{
    public interface IRepository<TEntity> : IDisposable where TEntity : DefaultEntity
    {
        void Add(TEntity obj);
        TEntity GetById(int id);
        IQueryable<TEntity> GetAll();
        void Update(TEntity obj);
        void Remove(int id);
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
