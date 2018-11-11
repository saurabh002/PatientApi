using GraphNetTest.BusinessServices;
using GraphNetTest.Model;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GraphNetTest.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-Custom-Header")]
    public class PatientController : ApiController
    {
        IPatientServices _patientService;
        public PatientController(IPatientServices patientServices)
        {
            _patientService = patientServices;
        }
        // GET api/<controller>
        //Get all patients
        [HttpGet]
        public IEnumerable<Patient> GetAll()
        {
            return this._patientService.GetPatients();
        }

        //Get patient by id
        [HttpGet]
        public Patient Get(string id)
        {
            return this._patientService.GetPatient(id);
        }

        //Add new patient
        [HttpPost]
        public IHttpActionResult Add(Patient p)
        {
            int response =this._patientService.AddPatient(p);
            if (response == -1)
                return Conflict();
            else
                return Ok("Data posted successfully");
        }

        //update patient record
        [HttpPut]
        public void Update(Patient p)
        {
            this._patientService.UpdatePatient(p);
        }

        //delete patient record
        public void Delete(Patient p)
        {
            this._patientService.DeletePatient(p);
        }
    }
}
