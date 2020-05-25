import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { FeedbackService } from '../services/feedback.service';
import { StudentService } from '../services/student.service';
import { TrainingProgramService } from '../services/training-program.service';
import { TrainerService } from '../services/trainer.service';
import { Feedback } from '../model/feedback';
import { Student } from '../model/student';
import { Trainer } from '../model/trainer';
import { Course } from '../model/course';
import { TrainingProgram } from '../model/training-program';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  trainerTab: boolean = false;
  feedbackTab: boolean = false;
  courseTab: boolean = false;

  showSkillsFlag: boolean = false;

  skillsToUpdate: string[];
  trainers: Trainer[];
  defaulters: Student[];
  feedbacks: Feedback[];
  courses: Course[];
  trainer: Trainer;

  trainingPrograms: TrainingProgram[];

  trainerUpdateId: string;
  courseUpdate: Course;

  viewFeedback: boolean = false;
  content = '';
  authorized: boolean;
  constructor(private router: Router,private userService: UserService,private trainerService: TrainerService, private courseService: CourseService, private feedbackService: FeedbackService, private trainingProgramService: TrainingProgramService) { }

  ngOnInit(): void {

    this.userService.getAdminBoard().subscribe(
      data => {
        this.authorized=true;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        window.alert("Unauthorized admin");
        this.router.navigate(['']);
      }
    );

  }
  toggleFeedbackTab() {
    this.trainerTab = false;
    this.feedbackTab = true;
    this.courseTab = false;
    this.getTrainingPrograms();
  }
  toggleTrainerTab() {
    this.trainerTab = true;
    this.feedbackTab = false;
    this.courseTab = false;
    this.getAllTrainers();
  }
  toggleCourseTab() {
    this.trainerTab = false;
    this.feedbackTab = false;
    this.courseTab = true;
    this.getAllCourses();
  }


  getFeedback(id: string) {
    this.feedbackService.getFeedbacks(id).subscribe((data: Feedback[]) => {
      this.feedbacks = data;
      console.log(this.feedbacks);
    }
    );
  }
  getDefaulters(id: string) {
    this.feedbackService.getDefaulters(id).subscribe((data: Student[]) => {
      this.defaulters = data;
      console.log(this.defaulters);
    }
    );
  }
  getAllTrainers() {
    this.trainerService.getTrainers().subscribe((data: Trainer[]) => {
      this.trainers = data;
      console.log(this.trainers);
    });
  }
  getTrainerById(id: string) {
    this.trainerService.getTrainerById(id).subscribe((data: Trainer) => {
      this.trainer = data;
      console.log(this.trainer);
    });
  }
  getAllCourses() {
    this.courseService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
      console.log(this.courses);
    });
  }
  getTrainingPrograms() {
    this.trainingProgramService.getAllTrainingPrograms().subscribe((data: TrainingProgram[]) => {
      this.trainingPrograms = data;
      console.log(this.trainingPrograms);
    });
  }
  viewTrainers() {
    this.getAllTrainers();

  }
  viewFeedbackOfTrainingProgram(id: string) {

    this.viewFeedback = true;
    this.getFeedback(id);
    this.getDefaulters(id);
  }
  updateCourse(id: string, name: string, days: number) {

    this.courseService.putCourse(new Course(id, name, days)).subscribe();
    this.getAllCourses();
    this.courseTab = false;
  }
  manageSkills(id: string) {
    this.trainerUpdateId = id;
    this.showSkillsFlag = true;
    for (var i = 0; i < this.trainers.length; i++) {
      if (this.trainers[i].trainerId == id) {
        this.skillsToUpdate = [...(this.trainers[i].skill)];
      }
    }
  }
  deleteSkill(skill) {
    // this.trainServ.deleteSkills(skill);
    // this.tempSkills=this.trainServ.getSkills();
    const index = this.skillsToUpdate.indexOf(skill, 0);
    if (index > -1) {
      this.skillsToUpdate.splice(index, 1);
    }
  }

  addSkill() {
    var skill = (<HTMLInputElement>document.getElementById('skill')).value;
    this.skillsToUpdate.push(skill);
  }
  updateSkills() {
    for (var i = 0; i < this.trainers.length; i++) {
      if (this.trainers[i].trainerId == this.trainerUpdateId) {
        this.trainers[i].skill = [...(this.skillsToUpdate)];
        this.trainerService.updateTrainer(this.trainers[i]).subscribe();
      }
    }
    this.showSkillsFlag = false;
  }
}

