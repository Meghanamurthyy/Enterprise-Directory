import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-search.component.html', // Corrected template URL
  styleUrls: ['./employee-search.component.css'],
})
export class EmployeeSearchComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeebySearch(id).subscribe((data) => {
        console.log("Fetched Employee Data:", JSON.stringify(data, null, 2));

        if (data && data.length > 0) { // Ensure we have at least one employee
          this.employee = data[0]; // Assign only the first employee

          // Use type assertion to safely access 'programs' (since it's not in Employee model)
          const employeeData = data[0] as any; // 👈 Type assertion here
          this.employee.program_name = employeeData.programs?.map((p: any) => p.program_name).join(', ') || 'N/A';
          this.employee.area_of_expertise = employeeData.programs?.map((p: any) => p.expertise_area).join(', ') || 'N/A';
        } else {
          console.error("No employee data found!");
        }
      });
    } else {
      console.error("No employee ID found in route!");
    }
  }

  modifyEmployee(id?: string): void {
    const employeeId = id || this.employee?.company_id;

    if (!employeeId) {
      console.error("Modify button clicked, but no valid employee ID found!", this.employee);
      return;
    }

    console.log("Navigating to Modify Page for Employee ID:", employeeId);
    this.router.navigate(['/modify-employee', employeeId]);
  }

  navigateToAddPage(): void {
    this.router.navigate(['/add-employee-program']);
  }
}
