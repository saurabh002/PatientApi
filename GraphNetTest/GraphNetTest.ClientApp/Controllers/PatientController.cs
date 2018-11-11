using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GraphNetTest.ClientApp.Controllers
{
    public class PatientController : Controller
    {
        // GET: Patient
        [Route("Patient/PatientDetails")]
        public ActionResult Index()
        {
            return View();
        }

        //Post: Add new patient
       // [Route("Patient/Add")]
        public ActionResult AddPatient()
        {
            return View("AddPatient");
        }
    }
}