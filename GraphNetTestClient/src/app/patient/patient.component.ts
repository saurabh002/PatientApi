import { Component, OnInit } from '@angular/core';
import {PatientService} from '../patient.service';
import {Router} from "@angular/router";
import {Patient} from '../patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Patient[];
  
    constructor(private router: Router, private patientService: PatientService) { }
  
    ngOnInit() {
      this.patientService.getPatients()
        .subscribe( data => {
          this.patients = data;
        });
    };
  
    // deleteUser(patient: Patient): void {
    //   this.patientService.deletePatient(patient)
    //     .subscribe( data => {
    //       this.patients = this.patients.filter(u => u !== patient);
    //     })
    // };
  
    editPatient(patient: Patient): void {
      localStorage.removeItem("editPatientId");
      localStorage.setItem("editPatientId", patient.PatientId.toString());
      this.router.navigate(['edit-patient']);
    };
  
    addPatient(): void {
      this.router.navigate(['add-patient']);
    };
  }
