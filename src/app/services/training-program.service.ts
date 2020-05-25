import { Injectable } from '@angular/core';
import { TrainingProgram } from '../model/training-program';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramService {

  constructor(private http: HttpClient) { }
  

  courses
  getAllTrainingPrograms():Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>('http://localhost:8762/course-ms/course/trainingprograms');
  }

  putTrainingPrograms(trainingprogram:TrainingProgram) {
    return this.http.put<string>('http://localhost:8762/course-ms/course/trainingprograms',trainingprogram, {  responseType: 'text' as 'json' });
  }
  postTrainingPrograms(trainingprogram:TrainingProgram) {
    console.log(trainingprogram);
    return this.http.post<string>('http://localhost:8762/course-ms/course/trainingprograms',trainingprogram, {  responseType: 'text' as 'json' });
  }
  deleteTrainingPrograms(id:string) {
    return this.http.delete<string>('http://localhost:8762/course-ms/course/trainingprograms/'+id, {  responseType: 'text' as 'json' });
  }


}
