import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enrollment } from '../model/enrollment';
import { TrainingProgram } from '../model/training-program';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http:HttpClient) { }
  postEnrollment(id:string,tpId:string){

    return this.http.post<string>('http://localhost:8762/employee-ms/employee/enroll/'+id,new TrainingProgram(tpId,null,null,null,null), {  responseType: 'text' as 'json' });
  }
}
