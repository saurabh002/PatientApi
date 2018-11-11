import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPatientComponent} from "./add-patient/add-patient.component";
import {PatientComponent} from "./patient/patient.component";
import {EditPatientComponent} from "./edit-patient/edit-patient.component";

const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'edit-patient', component: EditPatientComponent }
  //{path : '', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
