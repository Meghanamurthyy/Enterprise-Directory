import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeProgramComponent } from './components/add-employee-program/add-employee-program.component';
import { ModifyEmployeeComponent } from './components/modify-employee/modify-employee.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component'; // Import your search component

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'employee-search/:id', component: EmployeeSearchComponent },
  { path: 'add-employee-program', component: AddEmployeeProgramComponent },
  { path: 'modify-employee/:id', component: ModifyEmployeeComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', redirectTo: 'employees', pathMatch: 'full', data: { skipAssets: true } }
];