import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeProgramComponent } from './components/add-employee-program/add-employee-program.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'add', component: AddEmployeeProgramComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];