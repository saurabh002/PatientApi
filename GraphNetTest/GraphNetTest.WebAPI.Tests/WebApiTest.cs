using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net.Http;
using System.Threading.Tasks;
using GraphNetTest.WebAPI.Controllers;
using GraphNetTest.BusinessServices;
using GraphNetTest.Model;
using System.Linq;
using System.Collections.Generic;
using System.Web.Http.Results;

namespace GraphNetTest.WebAPI.Tests
{
    [TestClass]
    public class WebApiTest
    {
        // Creating object HTTP client
        // private readonly HttpClient httpClient = new HttpClient();
        [TestMethod, Description("Testing post API method")]
        public void PostTestMethod()
        {
            PatientController controllerObject = new PatientController(new PatientServices());
            Patient patientData = new Patient() {PatientId=Guid.NewGuid().ToString() ,FirstName = "first", LastName = "last", Gender = "Male", DateOfBirth = DateTime.Now, Phone = new TelephoneNumber() { HomePhone = 99999999, WorkPhone = 888888, CellPhone = 77777 } };
            var h = controllerObject.Add(patientData) as OkNegotiatedContentResult<System.String>; ;
            Assert.AreEqual(h.Content.ToLower(), "data posted successfully");
        }

        [TestMethod, Description("Testing the get API method")]
        public void GetTestMethod()
        {
            PatientController controllerObject = new PatientController(new PatientServices());
            IEnumerable<Patient> patientData = controllerObject.GetAll();
            Assert.IsTrue(patientData.Count<Patient>()>0);
        }
    }
}
