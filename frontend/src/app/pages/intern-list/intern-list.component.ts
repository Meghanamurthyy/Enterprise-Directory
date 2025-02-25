import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Intern {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phno: string;
  datejoin: string;
  program: string;
  expertise: string;
  sme: string;
}

@Component({
  selector: 'app-intern-list',
  standalone: true,
  templateUrl: './intern-list.component.html',
  styleUrls: ['./intern-list.component.css'],
  imports: [CommonModule,  FormsModule, RouterModule]
})
export class InternListComponent implements OnInit {
  managerId!: number;
  employee: any = null; // Initialize as null to prevent errors
  isEditing: boolean = false; // Track edit mode
  selectedIntern: Intern | null = null; // Track the intern being edited

  employees = [
    {
      id: 604897,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      phone_number: '9876543210',
      date_of_joining: '2022-03-01',
      program_name: 'Software Engineering',
      program_details: 'Backend Developer Training',
      status: 'Active'
    },
    {
      id: 45789,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'janesmith@example.com',
      phone_number: '9876543211',
      date_of_joining: '2023-01-15',
      program_name: 'Web Development',
      program_details: 'Frontend Developer Training',
      status: 'Active'
    }
  ];

  interns = [
    { id: 101, first_name: 'Alice', last_name: 'Joe', email: 'joe@email.com', phno: '9645378956', datejoin: '10/2/2024', program: 'Software Dev', expertise: 'Java', sme: 'David' },
    { id: 102, first_name: 'Bob', last_name: 'John', email: 'bob@email.com', phno: '9645788956', datejoin: '10/3/2024', program: 'AI/ML', expertise: 'Python', sme: 'Sarah' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.managerId = Number(this.route.snapshot.paramMap.get('managerId'));
    const employeeIdStr = this.route.snapshot.paramMap.get('employeeId');
    
    if (employeeIdStr) {
      const employeeId = Number(employeeIdStr);
      this.employee = this.employees.find(emp => emp.id === employeeId) || null;

      if (!this.employee) {
        console.error('No employee found with ID:', employeeId);
      }
    } else {
      console.error('Employee ID is undefined or null');
    }
  }

  addIntern() {
    this.router.navigate(['/add-intern', this.managerId]);
  }

  toggleEditForm() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    console.log('Updated Employee Details:', this.employee);
    this.isEditing = false;
  }

  editIntern(intern: Intern) {
    this.selectedIntern = { ...intern }; // Create a copy to avoid modifying the original directly
  }

  saveInternChanges() {
    if (this.selectedIntern) {
      const index = this.interns.findIndex(i => i.id === this.selectedIntern?.id);
      if (index !== -1) {
        this.interns[index] = { ...this.selectedIntern }; // Update the intern details
        console.log('Updated Intern Details:', this.interns[index]);
        this.selectedIntern = null; // Reset the form
      }
    }
  }
}