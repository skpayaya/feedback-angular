import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  


  getAllStudents() {
    return this.http.get<Student[]>('http://localhost:8762/employee-ms/employee/studentlist');
  }


}