import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trainer } from '../model/trainer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private http: HttpClient) { }

  //trainer skill maintenance
  trainerDB: any[] = [];
  localTrainer: Trainer;

  getTrainers() {
    return this.http.get<Trainer[]>('http://localhost:8762/employee-ms/employee/trainers');
  }
  getTrainerById(trainerId: string) {
    return this.http.get<Trainer>('http://localhost:8762/employee-ms/employee/trainers'+ trainerId);
  }
  updateTrainer( trainer: Trainer):Observable<Trainer> {
    return this.http.put<Trainer>('http://localhost:8762/employee-ms/employee/trainers/', trainer);
  }
 
}
