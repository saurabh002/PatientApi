using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphNetTest.Data
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetSingle(string Id);
        // IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Delete(T entity);
        void Edit(T entity);
        void Save();
    }
}
