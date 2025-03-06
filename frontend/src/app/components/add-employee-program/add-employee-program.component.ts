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

  modifyEmployeeProgramData: any = {
    company_id: '',
    program_id: '',
    area_of_expertise: '',
    sme_status: 'No',
  };

  formErrors: any = {
    program_id: '',
    program_name: '',
    description: '',
    start_date: '',
    end_date: '',
    assign_program_id: '',
    company_id: '',
    area_of_expertise: '',
    sme_status: '',
    employee_company_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_joining: '',
    manager_id: '',
    modify_company_id: '',
    modify_program_id: '',
    modify_area_of_expertise: '',
    modify_sme_status: '',
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {}

  toggleForm(formType: string): void {
    this.showCreateProgram = formType === 'program';
    this.showAssignProgram = formType === 'assign';
    this.showCreateEmployee = formType === 'employee';
    this.showModifyEmployeeProgram = formType === 'modify';
  }

  // Validate Create Program Form
  validateCreateProgramForm(): boolean {
    let isValid = true;

    if (!this.newProgram.program_id) {
      this.formErrors.program_id = 'Program ID is required.';
      isValid = false;
    } else {
      this.formErrors.program_id = '';
    }

    if (!this.newProgram.program_name || this.newProgram.program_name.length < 3) {
      this.formErrors.program_name = 'Program Name is required and must be at least 3 characters.';
      isValid = false;
    } else {
      this.formErrors.program_name = '';
    }

    if (this.newProgram.description && this.newProgram.description.length > 500) {
      this.formErrors.description = 'Description cannot exceed 500 characters.';
      isValid = false;
    } else {
      this.formErrors.description = '';
    }

    if (!this.newProgram.start_date) {
      this.formErrors.start_date = 'Start Date is required.';
      isValid = false;
    } else {
      this.formErrors.start_date = '';
    }

    if (!this.newProgram.end_date) {
      this.formErrors.end_date = 'End Date is required.';
      isValid = false;
    } else if (this.newProgram.start_date && this.newProgram.end_date < this.newProgram.start_date) {
      this.formErrors.end_date = 'End Date must be after Start Date.';
      isValid = false;
    } else {
      this.formErrors.end_date = '';
    }

    return isValid;
  }

  // Validate Assign Program Form
  validateAssignProgramForm(): boolean {
    let isValid = true;

    if (!this.assignProgram.program_id) {
      this.formErrors.assign_program_id = 'Program ID is required.';
      isValid = false;
    } else {
      this.formErrors.assign_program_id = '';
    }

    if (!this.assignProgram.company_id) {
      this.formErrors.company_id = 'TE ID is required.';
      isValid = false;
    } else {
      this.formErrors.company_id = '';
    }

    if (!this.assignProgram.area_of_expertise) {
      this.formErrors.area_of_expertise = 'Area of Expertise is required.';
      isValid = false;
    } else {
      this.formErrors.area_of_expertise = '';
    }

    if (!this.assignProgram.sme_status) {
      this.formErrors.sme_status = 'SME Status is required.';
      isValid = false;
    } else {
      this.formErrors.sme_status = '';
    }

    return isValid;
  }

  // Validate Create Employee Form
  validateCreateEmployeeForm(): boolean {
    let isValid = true;

    if (!this.newEmployee.company_id) {
      this.formErrors.employee_company_id = 'TE ID is required.';
      isValid = false;
    } else {
      this.formErrors.employee_company_id = '';
    }

    if (!this.newEmployee.first_name || this.newEmployee.first_name.length < 2) {
      this.formErrors.first_name = 'First Name is required and must be at least 2 characters.';
      isValid = false;
    } else {
      this.formErrors.first_name = '';
    }

    if (!this.newEmployee.last_name || this.newEmployee.last_name.length < 2) {
      this.formErrors.last_name = 'Last Name is required and must be at least 2 characters.';
      isValid = false;
    } else {
      this.formErrors.last_name = '';
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.newEmployee.email || !emailPattern.test(this.newEmployee.email)) {
      this.formErrors.email = 'A valid email address is required.';
      isValid = false;
    } else {
      this.formErrors.email = '';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!this.newEmployee.phone_number || !phonePattern.test(this.newEmployee.phone_number)) {
      this.formErrors.phone_number = 'A valid 10-digit phone number is required.';
      isValid = false;
    } else {
      this.formErrors.phone_number = '';
    }

    if (!this.newEmployee.date_of_joining) {
      this.formErrors.date_of_joining = 'Date of Joining is required.';
      isValid = false;
    } else {
      this.formErrors.date_of_joining = '';
    }

    if (!this.newEmployee.manager_id) {
      this.formErrors.manager_id = 'Manager ID is required.';
      isValid = false;
    } else {
      this.formErrors.manager_id = '';
    }

    return isValid;
  }

  // Validate Modify Employee Program Form
  validateModifyEmployeeProgramForm(): boolean {
    let isValid = true;

    if (!this.modifyEmployeeProgramData.company_id) {
      this.formErrors.modify_company_id = 'TE ID is required.';
      isValid = false;
    } else {
      this.formErrors.modify_company_id = '';
    }

    if (!this.modifyEmployeeProgramData.program_id) {
      this.formErrors.modify_program_id = 'Program ID is required.';
      isValid = false;
    } else {
      this.formErrors.modify_program_id = '';
    }

    if (!this.modifyEmployeeProgramData.area_of_expertise) {
      this.formErrors.modify_area_of_expertise = 'Area of Expertise is required.';
      isValid = false;
    } else {
      this.formErrors.modify_area_of_expertise = '';
    }

    if (!this.modifyEmployeeProgramData.sme_status) {
      this.formErrors.modify_sme_status = 'SME Status is required.';
      isValid = false;
    } else {
      this.formErrors.modify_sme_status = '';
    }

    return isValid;
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
        this.showCreateEmployee = false; 
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
