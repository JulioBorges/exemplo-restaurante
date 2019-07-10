using Restaurante.Core.Domain;
using Restaurante.Core.Repository;
using Restaurante.Core.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Application.Services
{
    public class BaseService<TEntity> : IService<TEntity> where TEntity : DefaultEntity
    {
        private readonly IRepository<TEntity> _repository;

        public BaseService(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        public void Add(TEntity obj)
        {
            _repository.Add(obj);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _repository.GetAll();
        }

        public TEntity GetById(int id)
        {
            return _repository.GetById(id);
        }

        public void Remove(int id)
        {
            _repository.Remove(id);
        }

        public void Update(TEntity obj)
        {
            _repository.Update(obj);
        }

        public int SaveChanges()
        {
            return _repository.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _repository.SaveChangesAsync();
        }

        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}
