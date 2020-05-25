import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  constructor(private http: HttpClient) { }
  
  getAllCourses() {
    return this.http.get<Course[]>('http://localhost:8762/course-ms/course/courses');
  }
  putCourse(course :Course):Observable<Course> {
    return this.http.put<Course>('http://localhost:8762/course-ms/course/updatecourse',JSON.stringify(course),this.httpOptions);
  }

}
