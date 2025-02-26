import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Program } from '../../models/program.model';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee-program',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee-program.component.html',
  styleUrls: ['./add-employee-program.component.css'],
})
export class AddEmployeeProgramComponent {
  newProgram: Program = {
    program_id: '',
    program_name: '',
    description: '',
    start_date: '',
    end_date: '',
  };

  assignProgram: any = {
    program_id: '',
    company_id: '',
    area_of_expertise: '',
    sme_status: false,
  };

  newEmployee: Employee = {
    
    company_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_joining: '',
    manager_id: '',
    program_name: '',
    area_of_expertise: '',
    sme_status: false,
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  // Handle Create Program Form Submission
  onCreateProgramSubmit(): void {
    this.employeeService.createProgram(this.newProgram).subscribe({
      next: (response) => {
        alert('Program created successfully!');
        this.newProgram = {
          program_id: '',
          program_name: '',
          description: '',
          start_date: '',
          end_date: '',
        };
      },
      error: (error) => {
        alert('Error creating program: ' + error.message);
      },
    });
  }

  // Handle Assign Program Form Submission
  onAssignProgramSubmit(): void {
    const { program_id, company_id, area_of_expertise, sme_status } = this.assignProgram;
    this.employeeService
      .assignProgram(program_id, company_id, area_of_expertise, sme_status)
      .subscribe({
        next: (response) => {
          alert('Program assigned successfully!');
          this.assignProgram = {
            program_id: '',
            company_id: '',
            area_of_expertise: '',
            sme_status: false,
          };
        },
        error: (error) => {
          alert('Error assigning program: ' + error.message);
        },
      });
  }

  // Handle Create Employee Form Submission
  onCreateEmployeeSubmit(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (response) => {
        alert('Employee created successfully!');
        this.newEmployee = {
          company_id: '',
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          date_of_joining: '',
          manager_id: '',
          program_name: '',
          area_of_expertise: '',
          sme_status: false,
        };
      },
      error: (error) => {
        alert('Error creating employee: ' + error.message);
      },
    });
  }
}