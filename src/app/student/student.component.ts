import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../model/student';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../model/feedback';
import { TrainingProgram } from '../model/training-program';
import { DataService } from '../services/data-service.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  feedbacks: Feedback[];
  students: Student[];
  addFeedbacktab:boolean=false;

  studentId:number;
  trainingProgramId:string;
  trainingProgram:TrainingProgram;
  trainingProgramsPending:TrainingProgram[];
  criteriaFirst: string;
  criteriaSecond: string;
  criteriaThird: string;
  criteriaFourth: string;
  criteriaFifth: string;
  content: any;
  authorized: boolean;
  constructor(private router: Router,private userService: UserService,private studentService: StudentService, private feedbackService: FeedbackService,private data: DataService) { }
  ngOnInit(): void {
    this.userService.getStudentBoard().subscribe(
      data => {
        
        this.authorized=true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        window.alert("Unauthorized student");
        this.router.navigate(['']);
      }
    );

    this.data.currentMessage.subscribe(message => this.studentId = parseInt(message))
    this.studentService.getAllStudents().subscribe((data: Student[]) => {
      this.students = data;
      console.log(this.students);
    }
    );
    
  }
  toggleAddFeedbackTab() {
    this.addFeedbacktab=true;
    this.findProgramsToEnterFeedback(this.studentId);
  }
  findProgramsToEnterFeedback(id:number) {
    this.feedbackService.feedbackPending(id).subscribe((data:TrainingProgram[]) => {
      this.trainingProgramsPending=data;
      console.log(this.trainingProgramsPending);
    });
  }
  addFeedback() {
    console.log(this.trainingProgramId);
    this.trainingProgramsPending.forEach(element => {
      if(element.id === this.trainingProgramId){
        this.trainingProgram=element;
      }
    });
    const feedback=new Feedback(new User(this.studentId),this.trainingProgram,this.criteriaFirst,this.criteriaSecond,this.criteriaThird,this.criteriaFourth,this.criteriaFifth);
    console.log(feedback);
     this.feedbackService.postFeedback(feedback).subscribe();
    this.addFeedbacktab=false;
  }
  log(x){
    console.log(x);
  }
  lessThan(subj: number, num: number) {
    return subj < num;
  }
}
