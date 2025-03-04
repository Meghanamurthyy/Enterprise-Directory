// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../../services/employee.service';
// import { Employee } from '../../models/employee.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-employee-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './employee-details.component.html',
//   styleUrls: ['./employee-details.component.css'],
// })
// export class EmployeeDetailsComponent implements OnInit {
//   employee: Employee | undefined;
//   subordinates: Employee[] = [];

//   constructor(
//     private employeeService: EmployeeService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}


//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.employeeService.getEmployeeById(id).subscribe((data) => {
//         console.log("Fetched Employee Data:", JSON.stringify(data, null, 2));
  
//         if (data) {
//           this.employee = data;
  
//           // Use type assertion to bypass TypeScript errors
//           const employeeData: any = data;
//           this.employee.program_name = employeeData.programs?.map((p: any) => p.program_name).join(', ') || 'N/A';
//           this.employee.area_of_expertise = employeeData.programs?.map((p: any) => p.expertise_area).join(', ') || 'N/A';
//         } else {
//           console.error("No employee data found!");
//         }
//       });
  
//       this.employeeService.getEmployeesUnderManager(id).subscribe((data) => {
//         console.log("Fetched Subordinates Data:", JSON.stringify(data, null, 2));
  
//         this.subordinates = data.map(sub => {
//           const subData: any = sub;
//           return {
//             ...sub,
//             program_name: subData.programs?.map((p: any) => p.program_name).join(', ') || 'N/A',
//             area_of_expertise: subData.programs?.map((p: any) => p.expertise_area).join(', ') || 'N/A',
//           };
//         });
//       });
//     } else {
//       console.error("No employee ID found in route!");
//     }
//   }
  


  


  
//   modifyEmployee(id?: string): void {
//     const employeeId = id || this.employee?.company_id;
    
//     if (!employeeId) {
//       console.error("Modify button clicked, but no valid employee ID found!", this.employee);
//       return;
//     }
  
//     console.log("Navigating to Modify Page for Employee ID:", employeeId);
//     this.router.navigate(['/modify-employee', employeeId]);
//   }
  
  

//   navigateToAddPage(): void {
//     this.router.navigate(['/add-employee-program']);
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../../services/employee.service';
// import { Employee } from '../../models/employee.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-employee-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './employee-details.component.html',
//   styleUrls: ['./employee-details.component.css'],
// })
// export class EmployeeDetailsComponent implements OnInit {
//   employee: Employee | undefined;
//   subordinates: Employee[] = [];

//   constructor(
//     private employeeService: EmployeeService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const companyId = this.route.snapshot.paramMap.get('company_id'); // Use company_id instead of id
//     if (companyId) {
//       // Fetch employee details by company_id
//       this.employeeService.getEmployeebyCompanyId(companyId).subscribe({
//         next: (data) => {
//           console.log("Fetched Employee Data:", JSON.stringify(data, null, 2));

//           if (data) {
//             this.employee = data;

//             // Use type assertion to bypass TypeScript errors
//             const employeeData: any = data;
//             this.employee.program_name = employeeData.programs?.map((p: any) => p.program_name).join(', ') || 'N/A';
//             this.employee.area_of_expertise = employeeData.programs?.map((p: any) => p.expertise_area).join(', ') || 'N/A';
//           } else {
//             console.error("No employee data found!");
//             this.router.navigate(['/employees']); // Redirect to employee list if no data is found
//           }
//         },
//         error: (error) => {
//           console.error("Error fetching employee details:", error);
//           this.router.navigate(['/employees']); // Redirect to employee list on error
//         },
//       });

//       // Fetch employees under this manager (if applicable)
//       this.employeeService.getEmployeesUnderManager(companyId).subscribe({
//         next: (data) => {
//           console.log("Fetched Subordinates Data:", JSON.stringify(data, null, 2));

//           this.subordinates = data.map((sub: any) => {
//             return {
//               ...sub,
//               program_name: sub.programs?.map((p: any) => p.program_name).join(', ') || 'N/A',
//               area_of_expertise: sub.programs?.map((p: any) => p.expertise_area).join(', ') || 'N/A',
//             };
//           });
//         },
//         error: (error) => {
//           console.error("Error fetching subordinates:", error);
//         },
//       });
//     } else {
//       console.error("No company_id found in route!");
//       this.router.navigate(['/employees']); // Redirect to employee list if no company_id is found
//     }
//   }

//   modifyEmployee(id?: string): void {
//     const employeeId = id || this.employee?.company_id;

//     if (!employeeId) {
//       console.error("Modify button clicked, but no valid employee ID found!", this.employee);
//       return;
//     }

//     console.log("Navigating to Modify Page for Employee ID:", employeeId);
//     this.router.navigate(['/modify-employee', employeeId]);
//   }

//   navigateToAddPage(): void {
//     this.router.navigate(['/add-employee-program']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

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
    const company_id = this.route.snapshot.paramMap.get('company_id'); // Use company_id instead of id
    if (company_id) {
      // Fetch employee details by company_id
      this.employeeService.getEmployeebyCompanyId(company_id).subscribe({
        next: (data) => {
          console.log("Fetched Employee Data:", JSON.stringify(data, null, 2));

          if (data) {
            this.employee = data;

            // Use type assertion to bypass TypeScript errors
            const employeeData: any = data;
            if (this.employee) {
              this.employee.program_name = employeeData.programs?.map((p: any) => p.program_name).join(', ') || 'N/A';
              this.employee.area_of_expertise = employeeData.programs?.map((p: any) => p.expertise_area).join(', ') || 'N/A';
            }
          } else {
            console.error("No employee data found!");
            this.router.navigate(['/employees']); // Redirect to employee list if no data is found
          }
        },
        error: (error) => {
          console.error("Error fetching employee details:", error);
          this.router.navigate(['/employees']); // Redirect to employee list on error
        },
      });

      // Fetch employees under this manager (if applicable)
      this.employeeService.getEmployeesUnderManager(company_id).subscribe({
        next: (data) => {
          console.log("Fetched Subordinates Data:", JSON.stringify(data, null, 2));

          this.subordinates = data.map((sub: any) => {
            return {
              ...sub,
              program_name: sub.programs?.map((p: any) => p.program_name).join(', ') || 'N/A',
              area_of_expertise: sub.programs?.map((p: any) => p.expertise_area).join(', ') || 'N/A',
            };
          });
        },
        error: (error) => {
          console.error("Error fetching subordinates:", error);
        },
      });
    } else {
      console.error("No company_id found in route!");
      this.router.navigate(['/employees']); // Redirect to employee list if no company_id is found
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