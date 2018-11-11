using GraphNetTest.Model;
using System.Collections.Generic;

namespace GraphNetTest.BusinessServices
{
    public interface IPatientServices
    {
        List<Patient> GetPatients();
        Patient GetPatient(string id);
        int AddPatient(Patient p);
        void UpdatePatient(Patient p);
        void DeletePatient(Patient p);
    }
}
