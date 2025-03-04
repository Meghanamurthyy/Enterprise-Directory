import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  getUsers(){
    const url = 'http://localhost:4590/api/employees/';
    return this.http.get(url);
  }

  saveUsers(){
    const url = 'http://localhost:4590/api/programs/assignEmployeeToProgram';
    const body = {id: '', name: '', program: '', expertise: '', sme: ''}; // Replace with the actual body content
    return this.http.post(url, body);
  }
}
