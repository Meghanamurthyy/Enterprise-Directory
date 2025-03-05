import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { Program } from '../models/program.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:4590/api'; 

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees/managers`);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  getEmployeesUnderManager(managerId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees/manager?manager_id=${managerId}`);
  }

  createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.apiUrl}/programs/createProgram`, program);
  }

  assignProgram(programId: string, companyId: string, areaOfExpertise: string, smeStatus: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/programs/assignEmployeeToProgram`, { programId, companyId, areaOfExpertise, smeStatus });
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees/createEmployee`, employee);
  }

updateEmployee(company_id: string, program_id: string, area_of_expertise: string, sme_status: string): Observable<any> {
  const body = { company_id, program_id, area_of_expertise, sme_status };
  return this.http.put(`${this.apiUrl}/programs/updateEmployeeProgram`, body);
}


  getEmployeebyCompanyId(company_id: string): Observable<Employee> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees?company_id=${company_id}`).pipe(
      map((employees) => employees[0]) 
    );
  }
}