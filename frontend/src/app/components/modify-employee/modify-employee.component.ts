import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modify-employee.component.html',
  styleUrls: ['./modify-employee.component.css'],
})
export class ModifyEmployeeComponent implements OnInit {
  employee: Employee = {
    
    company_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_joining: '',
    manager_id: '',
    program_name: '',
    area_of_expertise: '',
    sme_status: "No",
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        this.employee = data;
      });
    }
  }

  onSubmit(): void {
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: (response) => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees', this.employee.company_id]);
      },
      error: (error) => {
        alert('Error updating employee: ' + error.message);
      },
    });
  }
}