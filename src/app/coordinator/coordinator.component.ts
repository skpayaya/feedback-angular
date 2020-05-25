import { Component, OnInit } from '@angular/core';
import { Feedback } from '../model/feedback';
import { Student } from '../model/student';
import { StudentService } from '../services/student.service';
import { FeedbackService } from '../services/feedback.service';
import { TrainingProgramService } from '../services/training-program.service';
import { TrainingProgram } from '../model/training-program';
import { MatDatepickerInputEvent, MatMonthView } from '@angular/material/datepicker';
import { Trainer } from '../model/trainer';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { TrainerService } from '../services/trainer.service';
import { stringify } from 'querystring';
import { element } from 'protractor';
import { EnrollmentService } from '../services/enrollment.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit {

  trainingProgramTab: boolean = false;
  feedbackTab: boolean = false;
  enrollTab: boolean = false;


  defaulters: Student[];
  feedbacks: Feedback[];
  students: Student[];
  trainingPrograms: TrainingProgram[];

  trainingProgramAdd: TrainingProgram;
  trainingProgramDeleteId: string;
  trainingProgramUpdate: TrainingProgram;

  studentenrollId: string;
  trainingProgramEnroll: TrainingProgram;
  viewFeedback: boolean = false;
  date: Date;
  pickerInput2: any;
  picker2: any;
  startDate: string;
  endDate: string;
  tpID: string;
  cID: string;
  tID: string;
  courses: Course[];
  trainers: Trainer[];
  checkIfCourseExists: boolean = false;
  checkIfTrainerExists: boolean = false;
  month: string;
  dateAdd: string;
  enableUpdate: boolean;
  tpIDUpdate: any;
  cIDUpdate: any;
  tIDUpdate: any;
  studentId: string;
  enrollFlag: boolean;
  trainingProgramId: string;
  content: any;
  authorized: boolean;


  toggleFeedbackTab() {
    this.trainingProgramTab = false;
    this.feedbackTab = true;
    this.enrollTab = false;
    this.getTrainingPrograms();
  }
  toggleTrainingProgramTab() {
    this.trainingProgramTab = true;
    this.feedbackTab = false;
    this.enrollTab = false;
    this.getTrainingPrograms();
  }
  toggleEnrollTab() {
    this.trainingProgramTab = false;
    this.feedbackTab = false;
    this.enrollTab = true;
    this.getTrainingPrograms();
  }
  constructor(private router: Router, private trainerService: TrainerService, private userService: UserService, private studentService: StudentService, private courseService: CourseService, private feedbackService: FeedbackService, private trainingProgramService: TrainingProgramService, private enrollmentService: EnrollmentService) {
    this.date = new Date();
  }
  ngOnInit(): void {


    this.userService.getCoordinatorBoard().subscribe(
      data => {
        this.authorized = true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        window.alert("Unauthorized coordinator");
        this.router.navigate(['']);
      }
    );

    this.studentService.getAllStudents().subscribe((data: Student[]) => {
      this.students = data;
      // console.log(this.students);
    }
    );
    this.getCourses();
    this.getTrainers();
  }
  getFeedback(id: string) {
    this.feedbackService.getFeedbacks(id).subscribe((data: Feedback[]) => {
      this.feedbacks = data;
      // console.log(this.feedbacks);
    }
    );
  }
  getDefaulters(id: string) {
    this.feedbackService.getDefaulters(id).subscribe((data: Student[]) => {
      this.defaulters = data;
      // console.log(this.defaulters);
    }
    );
  }
  getTrainingPrograms() {
    this.trainingProgramService.getAllTrainingPrograms().subscribe((data: TrainingProgram[]) => {
      this.trainingPrograms = data;
      // console.log(this.trainingPrograms);
    });
  }
  getCourses() {
    this.courseService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
      // console.log(this.courses);
    });
  }

  viewFeedbackOfTrainingProgram(id: string) {

    this.viewFeedback = true;
    this.getFeedback(id);
    this.getDefaulters(id);
  }
  deleteTrainingProgram(id: string) {
    var response: string;
    var i = 0;
    this.trainingProgramService.deleteTrainingPrograms(id).subscribe(data => {
      if (data == 'Deleted') {
        this.trainingPrograms = this.trainingPrograms.filter(element => element.id != id);
      } else {
        window.alert(data);
      }
    });

  }
  checkt(idTrainer){
    console.log(idTrainer);
    
    this.getTrainers();
    this.trainers.forEach(element => {
      // console.log(element.trainerId);
      if (element.trainerId == idTrainer) {
        return true;
      }
    });
    return false;
  }
  addTrainingprogram() {
    const tp = new TrainingProgram(this.tpID, new Course(this.cID, '', 0), new Trainer(this.tID), this.startDate, this.endDate);

    this.getTrainingPrograms();
    this.getCourses();
    this.courses.forEach(element => {
      // console.log(element.courseId);
      if (element.courseId == this.cID) {


        this.checkIfCourseExists = true;
      }
    });
    this.getTrainers();
    this.trainers.forEach(element => {
      // console.log(element.trainerId);
      if (element.trainerId == this.tID) {
        this.checkIfTrainerExists = true;
      }
    });
    if (this.checkIfCourseExists && this.checkIfTrainerExists) {
      this.trainingPrograms.push(tp);
      this.trainingProgramService.postTrainingPrograms(tp).subscribe(data => {
        window.alert(data);
      });
      this.trainingProgramTab = false;
    }
    else if (this.checkIfCourseExists == false) {
      window.alert("Course doesn't exist");
    } else {

      window.alert("Trainer doesn't exist");
    }
  }

  getTrainers() {
    this.trainerService.getTrainers().subscribe((data: Trainer[]) => {
      this.trainers = data;
    });
  }
  addStartDateEvent(event: MatDatepickerInputEvent<Date>) {

    this.month = '' + (event.value.getMonth() + 1);
    this.dateAdd = '' + event.value.getDate();

    if (event.value.getMonth() + 1 < 10) {
      this.month = '0' + this.month;
    }
    if (event.value.getDate() < 10) {
      this.dateAdd = '0' + event.value.getDate();
    }


    this.startDate = event.value.getFullYear() + '-' + this.month + '-' + this.dateAdd;
    // console.log(this.startDate);
  }
  addEndDateEvent(event: MatDatepickerInputEvent<Date>) {

    this.month = '' + (event.value.getMonth() + 1);
    this.dateAdd = '' + event.value.getDate();
    if (event.value.getMonth() + 1 < 10) {
      this.month = '0' + this.month;
    }
    if (event.value.getDate() < 10) {
      this.dateAdd = '0' + this.dateAdd;
    }

    this.endDate = event.value.getFullYear() + '-' + this.month + '-' + this.dateAdd;
    // console.log(this.endDate);
  }
  updateTrainingProgram(id, courseId, trainerId) {
    this.tpIDUpdate = id;
    this.cIDUpdate = courseId;
    this.tIDUpdate = trainerId;
    this.enableUpdate = true;
  }
  updateTrainingProgramFinal() {
    this.trainingProgramService.putTrainingPrograms(new TrainingProgram(this.tpIDUpdate, new Course(this.cIDUpdate, '', 0), new Trainer(this.tIDUpdate), this.startDate, this.endDate)).subscribe(data => console.log(data));
    this.trainingProgramTab = false;
    this.enableUpdate = false;
  }

  enrollStudent(id: string) {
    this.enrollFlag = true;
    this.trainingProgramId = id;
    this.getStudents();
  }
  enroll(id: string) {
    this.enrollmentService.postEnrollment(id, this.trainingProgramId).subscribe(data => window.alert(data));
  }
  getStudents() {
    this.studentService.getAllStudents().subscribe((data) => {
      this.students = data;
    });
  }
  cancelUpdate() {
    this.enableUpdate = false;
  }
  log(x){
    console.log(x);
  }
}

