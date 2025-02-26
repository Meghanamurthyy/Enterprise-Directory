import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Program } from '../models/program.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://your-api-url.com'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  getEmployeesUnderManager(managerId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees?manager_id=${managerId}`);
  }

  createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.apiUrl}/programs`, program);
  }

  assignProgram(programId: string, companyId: string, areaOfExpertise: string, smeStatus: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-program`, { programId, companyId, areaOfExpertise, smeStatus });
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee);
  }
}