import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined;
  subordinates: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch employee details
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        this.employee = data;
      });

      // Fetch employees under this manager
      this.employeeService.getEmployeesUnderManager(id).subscribe((data) => {
        this.subordinates = data;
      });
    }
  }

  modifyEmployee(id?: string): void {
    const employeeId = id || this.employee?.company_id;
    if (employeeId) {
      this.router.navigate(['/modify-employee', employeeId]);
    }
  }

  navigateToAddPage(): void {
    this.router.navigate(['/add-employee-program']);
  }
}