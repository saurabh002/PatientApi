using GraphNetTest.Data;
using GraphNetTest.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GraphNetTest.BusinessServices
{
    public class PatientServices :IPatientServices
    {
        private PatientRepository _patientRepository;

        public PatientServices() : this(null)
        {
        }
        public PatientServices(PatientRepository patientRepository)
        {
            this._patientRepository = new PatientRepository();
        }

        //Get all patients
        public List<Patient> GetPatients()
        {
            var patients = this._patientRepository.GetAll().ToList();
            var list = new List<Patient>();
            foreach (var c in patients)
            {
                list.Add(new Patient
                {
                    PatientId = c.PatientId,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    DateOfBirth = c.DateOfBirth,
                    Gender = c.Gender,
                    Phone = new TelephoneNumber { HomePhone = c.HomePhone, WorkPhone = c.WorkPhone, CellPhone = c.CellPhone }
                });
            }
            return list;
        }

        //Get patient by id
        public Patient GetPatient(string id)
        {
            try
            {
                var c = this._patientRepository.GetSingle(id);
                var p = new Patient()
                {
                    PatientId = c.PatientId,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    DateOfBirth = c.DateOfBirth,
                    Gender = c.Gender,
                    Phone = new TelephoneNumber { HomePhone = c.HomePhone, WorkPhone = c.WorkPhone, CellPhone = c.CellPhone }
                };

                return p;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Add new patient record
        public int AddPatient(Patient p)
        {
            var patient = new PatientData()
            {
                PatientId = p.PatientId,
                FirstName = p.FirstName,
                LastName = p.LastName,
                DateOfBirth = p.DateOfBirth,
                Gender = p.Gender,
                HomePhone = p.Phone?.HomePhone,
                WorkPhone = p.Phone?.WorkPhone,
                CellPhone = p.Phone?.CellPhone
            };
            try
            {
                this._patientRepository.Add(patient);
                this._patientRepository.Save();
            }
            catch (Exception) when (_patientRepository.GetSingle(p.PatientId) != null)
            {
                return -1;
            }
            catch (Exception)
            {
                throw;
            }
            return 1;
        }

        //Update existing patient record
        public void UpdatePatient(Patient p)
        {
            try
            {
                var patient = new PatientData()
                {
                    PatientId = p.PatientId,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    DateOfBirth = p.DateOfBirth,
                    Gender = p.Gender,
                    HomePhone = p.Phone?.HomePhone,
                    WorkPhone = p.Phone?.WorkPhone,
                    CellPhone = p.Phone?.CellPhone
                };
                this._patientRepository.Edit(patient);
                this._patientRepository.Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Delete patient
        public void DeletePatient(Patient p)
        {
            try
            {
                var patient = new PatientData()
                {
                    PatientId = p.PatientId,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    DateOfBirth = p.DateOfBirth,
                    Gender = p.Gender,
                    HomePhone = p.Phone?.HomePhone,
                    WorkPhone = p.Phone?.WorkPhone,
                    CellPhone = p.Phone?.CellPhone
                };
                this._patientRepository.Delete(patient);
                this._patientRepository.Save();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
