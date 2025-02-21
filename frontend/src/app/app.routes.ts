import { Routes } from '@angular/router';
import { ManagerListComponent } from './pages/manager-list/manager-list.component';
import { InternListComponent } from './pages/intern-list/intern-list.component';
import { AddInternComponent } from './pages/add-intern/add-intern.component';
//import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  { path: '', component: ManagerListComponent },
  { path: 'interns/:managerId', component: InternListComponent },
  { path: 'add-intern/:managerId', component: AddInternComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to the homepage
];
