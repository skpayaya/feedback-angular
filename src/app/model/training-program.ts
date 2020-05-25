import { Trainer } from './trainer';
import { Course } from './course';

export class TrainingProgram {
    id: string;
    course: Course;
    trainer: Trainer;
    startDate: string;
    endDate: string;
    constructor(id: string,
        course: Course,
        trainer: Trainer,
        startDate: string,
        endDate: string) {
            this.id=id;
            this.course=course;
            this.trainer=trainer;
            this.startDate=startDate;
            this.endDate=endDate;

    }
}
