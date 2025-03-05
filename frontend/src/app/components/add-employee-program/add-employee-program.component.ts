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
  showCreateProgram = false;
  showAssignProgram = false;
  showCreateEmployee = false;
   showModifyEmployeeProgram = false;

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

   modifyEmployeeProgramData: any = { // New object for modifying employee program
    company_id: '',
    program_id: '',
    area_of_expertise: '',
    sme_status: 'No',
  };
  

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {}

  // Toggle forms visibility
  // toggleForm(formType: string): void {
  //   if (formType === 'program') {
  //     this.showCreateProgram = !this.showCreateProgram;
  //   } else if (formType === 'assign') {
  //     this.showAssignProgram = !this.showAssignProgram;
  //   } else if (formType === 'employee') {
  //     this.showCreateEmployee = !this.showCreateEmployee;
  //   }
  // }
  
 toggleForm(formType: string): void {
  if (formType === 'program') {
    this.showCreateProgram = !this.showCreateProgram;
    this.showAssignProgram = false;
    this.showCreateEmployee = false;
    this.showModifyEmployeeProgram = false;
  } else if (formType === 'assign') {
    this.showAssignProgram = !this.showAssignProgram;
    this.showCreateProgram = false;
    this.showCreateEmployee = false;
    this.showModifyEmployeeProgram = false;
  } else if (formType === 'employee') {
    this.showCreateEmployee = !this.showCreateEmployee;
    this.showCreateProgram = false;
    this.showAssignProgram = false;
    this.showModifyEmployeeProgram = false;
  }
  else if(formType === 'modify') {
    this.showModifyEmployeeProgram = !this.showModifyEmployeeProgram;
    this.showCreateProgram = false;
    this.showAssignProgram = false;
    this.showCreateEmployee = false;
  }
}



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
        this.showCreateProgram = false; // Hide form after submission
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
          this.showAssignProgram = false; // Hide form after submission
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
        this.showCreateEmployee = false; // Hide form after submission
      },
      error: (error: HttpErrorResponse) => {
        alert('Error creating employee: ' + error.message);
      },
    });
  }

   // Modify Employee Program Form Submission
  onModifyEmployeeProgramSubmit(): void {
      const { company_id, program_id, area_of_expertise, sme_status } = this.modifyEmployeeProgramData;
      this.employeeService.updateEmployee(company_id, program_id, area_of_expertise, sme_status).subscribe({
    next: () => {
      alert('Employee program updated successfully!');
      this.modifyEmployeeProgramData = {
        company_id: '',
        program_id: '',
        area_of_expertise: '',
        sme_status: '',
      };
    },
    error: (error) => {
      alert('Error updating employee program: ' + error.message);
    },
  });
}
}
