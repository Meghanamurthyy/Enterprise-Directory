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
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        console.log("Fetched Employee Data:", JSON.stringify(data, null, 2));
  
        if (data) {
          this.employee = data;
  
          // Use type assertion to bypass TypeScript errors
          const employeeData: any = data;
          this.employee.program_name = employeeData.programs?.map((p: any) => p.program_name).join(', ') || 'N/A';
          this.employee.area_of_expertise = employeeData.programs?.map((p: any) => p.area_of_expertise).join(', ') || 'N/A';
          this.employee.sme_status=employeeData.programs?.map((p: any) => p.sme_status).join(', ') || 'N/A';
        } else {
          console.error("No employee data found!");
        }
      });
  
      this.employeeService.getEmployeesUnderManager(id).subscribe((data) => {
        console.log("Fetched Subordinates Data:", JSON.stringify(data, null, 2));
  
        this.subordinates = data.map(sub => {
          const subData: any = sub;
          return {
            ...sub,
            program_name: subData.programs?.map((p: any) => p.program_name).join(', ') || 'N/A',
            area_of_expertise: subData.programs?.map((p: any) => p.area_of_expertise).join(', ') || 'N/A',
            sme_status: subData.programs?.map((p: any) => p.sme_status).join(', ') || 'N/A',
          };
        });
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