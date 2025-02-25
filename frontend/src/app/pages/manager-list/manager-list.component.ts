import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { NavbarComponent } from '../../components/navbar/navbar.component'; // ✅ Import NavbarComponent
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-manager-list',
  standalone: true,
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
  imports: [CommonModule,  FormsModule, RouterModule]
})
export class ManagerListComponent {
  managers = [
    { id: 604897, name: 'John Doe', interns: ['Alice', 'Bob'], photo: 'assets/manager1.jpg' },
    { id: 45789, name: 'Jane Smith', interns: ['Charlie'], photo: 'assets/manager2.jpg' }
  ];

  constructor(private router: Router) {}

  viewInterns(managerId: number, employeeId: number) {
    console.log("Navigating with:", managerId, employeeId);
    this.router.navigate(['/interns', managerId, employeeId]);
  }
  
  
}
