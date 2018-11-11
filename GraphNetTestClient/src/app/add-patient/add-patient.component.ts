import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../patient.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private patientService: PatientService) { }
  addForm: FormGroup;
  submitted = false;
  validateDOB(e){
    let dob = new Date(e);
    let today = new Date();
    if(dob > today){
      return { 'has-danger': !this.addForm.controls["DateOfBirth"].pristine && !this.addForm.controls["DateOfBirth"].valid};
    }};

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      PatientId: ['', Validators.required],
      FirstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      LastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      Gender: [''],
      DateOfBirth: [''],
      Phone: this.formBuilder.group({ HomePhone:['',Validators.pattern("[0-9]\\d{9}")], WorkPhone:['',Validators.pattern("[0-9]\\d{9}")], 
         CellPhone:['',Validators.pattern("[0-9]\\d{9}")]
        })
    });
    //Validators.pattern("[0-9]{0-10}")
  };

  get f() { return this.addForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.patientService.addPatient(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['patient']);
      });
  }
}