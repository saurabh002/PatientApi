import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Patient} from "./patient.model";

@Injectable()

export class PatientService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:20026/api/patient';

  getPatients() {
    return this.http.get<Patient[]>(this.baseUrl+'/getall');
  }

  getPatientById(id: number) {
     return this.http.get<Patient>(this.baseUrl + '/get/' + id);
  }

  addPatient(patient: Patient) {
   const postedData =`<Patient  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">    
   <PatientId>${patient.PatientId}</PatientId>
   <FirstName>${patient.FirstName}</FirstName>
   <LastName>${patient.LastName}</LastName>
  
   <DateofBirth  xsi:nil="true">${patient.DateofBirth}</DateofBirth>
   <Gender>${patient.Gender}</Gender>
   <TelephoneNumber>
   <HomePhone  xsi:nil="true">${patient.HomePhone}</HomePhone>
   <WorkPhone  xsi:nil="true">${patient.WorkPhone}</WorkPhone>
   <CellPhone  xsi:nil="true">${patient.CellPhone}</CellPhone>
   </TelephoneNumber>
   </Patient>`

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'text/xml');
    httpHeaders = httpHeaders.append('Accept', 'text/xml');

    return this.http.post(this.baseUrl+"/add" ,postedData , { headers: httpHeaders });
  }

   updatePatient(patient: Patient) {
     return this.http.put(this.baseUrl + '/update', patient);
  }

  // deletePatient(id: number) {
  //   return this.http.delete(this.baseUrl + '/' + id);
  // }
}