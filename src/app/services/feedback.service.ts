import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';
import { Student } from '../model/student';
import { TrainingProgram } from '../model/training-program';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {
  constructor(private http:HttpClient) { }

  getFeedbacks(id:string):Observable<Feedback[]>{
  return this.http.get<Feedback[]>('http://localhost:8762/feedback-ms/feedback/feedbacks/'+id);
  }

  getDefaulters(id:string):Observable<Student[]>{
    return this.http.get<Student[]>('http://localhost:8762/feedback-ms/feedback/defaulters/'+id);
  }

  postFeedback(feedback:Feedback):Observable<Feedback>
  {
    return this.http.post<Feedback>('http://localhost:8762/feedback-ms/feedback/addfeedback',feedback);
  }
  feedbackPending(id):Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>('http://localhost:8762/feedback-ms/feedback/findprogramsleft/'+id);
  }
}