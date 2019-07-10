using Microsoft.EntityFrameworkCore;
using Restaurante.Core.Domain;
using Restaurante.Core.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Data.Repository
{
    public class BaseRepository<TEntity> : IRepository<TEntity>, IDisposable where TEntity : DefaultEntity
    {
        protected readonly RestauranteContext _db;
        protected readonly DbSet<TEntity> _dbSet;

        public BaseRepository(RestauranteContext context)
        {
            _db = context;
            _dbSet = _db.Set<TEntity>();
        }

        public virtual void Add(TEntity obj)
        {
            _dbSet.Add(obj);
        }

        public virtual TEntity GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return _dbSet;
        }

        public virtual void Update(TEntity obj)
        {
            _dbSet.Update(obj);
        }

        public virtual void Remove(int id)
        {
            _dbSet.Remove(_dbSet.Find(id));
        }

        public int SaveChanges()
        {
            return _db.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync();
        }

        public void Dispose()
        {
            _db.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
