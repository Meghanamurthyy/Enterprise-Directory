import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Program } from '../../models/program.model';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-employee-program',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee-program.component.html',
  styleUrls: ['./add-employee-program.component.css'],
})
export class AddEmployeeProgramComponent implements OnInit {
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
    sme_status: '',
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
    sme_status: '',
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {}

  // to handle Create Program Form Submission
  onCreateProgramSubmit(): void {
    this.employeeService.createProgram(this.newProgram).subscribe({
      next: (response: Program) => {
        alert('Program created successfully!');
        this.newProgram = {
          program_id: '',
          program_name: '',
          description: '',
          start_date: '',
          end_date: '',
        };
      },
      error: (error: HttpErrorResponse) => {
        alert('Error creating program: ' + error.message);
      },
    });
  }

  // to handle Assign Program Form Submission
  onAssignProgramSubmit(): void {
    const { program_id, company_id, area_of_expertise, sme_status } = this.assignProgram;
    this.employeeService
      .assignProgram(program_id, company_id, area_of_expertise, sme_status)
      .subscribe({
        next: (response: any) => {
          alert('Program assigned successfully!');
          this.assignProgram = {
            program_id: '',
            company_id: '',
            area_of_expertise: '',
            sme_status: '',
          };
        },
        error: (error: HttpErrorResponse) => {
          alert('Error assigning program: ' + error.message);
        },
      });
  }

  // to handle Create Employee Form Submission
  onCreateEmployeeSubmit(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (response: Employee) => {
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
          sme_status: '',
        };
      },
      error: (error: HttpErrorResponse) => {
        alert('Error creating employee: ' + error.message);
      },
    });
  }
}