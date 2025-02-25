import { Routes } from '@angular/router';
import { ManagerListComponent } from './app/pages/manager-list/manager-list.component';
import { InternListComponent } from './app/pages/intern-list/intern-list.component';
import { AddInternComponent } from './app/pages/add-intern/add-intern.component';

export const routes: Routes = [
  { path: '', component: ManagerListComponent },
  { path: 'interns/:managerId', component: InternListComponent },
  { path: 'add-intern/:managerId', component: AddInternComponent },
  { path: 'interns/:managerId/:employeeId', component: InternListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
