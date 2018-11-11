using System.Data.Entity;
using System.Linq;

namespace GraphNetTest.Data
{
    public class PatientRepository : IGenericRepository<PatientData>
    {
        public PatientDBEntities _context;
        public PatientRepository()
        {
            _context = new PatientDBEntities();
        }

        public IQueryable<PatientData> GetAll()
        {
            return _context.PatientDatas;
        }
        public PatientData GetSingle(string id)
        {
            return _context.PatientDatas.Find(id);
        }
        
        public void Add(PatientData entity)
        {
            this._context.PatientDatas.Add(entity);
        }

        public void Delete(PatientData entity)
        {
            var entry = _context.Entry(entity);
            if (entry.State == EntityState.Detached)
                _context.PatientDatas.Attach(entity);
            _context.PatientDatas.Remove(entity);
        }

        public void Edit(PatientData entity)
        {
            this._context.PatientDatas.Attach(entity);
            this._context.Entry(entity).State = EntityState.Modified;
        }

        public void Save()
        {
            this._context.SaveChanges();
        }
    }
}
