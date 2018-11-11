import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../patient.service";
import {Patient} from '../patient.model';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
    patient: Patient;
    editForm: FormGroup;
    constructor(private formBuilder: FormBuilder,private router: Router, private patientService: PatientService) { }
  
    ngOnInit() {
      let patientId = localStorage.getItem("editPatientId");
      if(!patientId) {
        alert("Invalid action.")
        this.router.navigate(['patient']);
        return;
      }
      this.editForm = this.formBuilder.group({
        PatientId: ['', Validators.required],
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Gender: [''],
        DateOfBirth: [''],
        Phone: this.formBuilder.group({ HomePhone:[''], WorkPhone:[''], 
           CellPhone:['']
          })
      });
      this.patientService.getPatientById(+patientId)
        .subscribe( data => {
          this.editForm.setValue(data);
        });
    }
  
    onSubmit() {
      this.patientService.updatePatient(this.editForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['patient']);
          },
          error => {
            alert(error);
          });
    }
  
  }
  