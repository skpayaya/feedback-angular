import { Student } from './student';
import { TrainingProgram } from './training-program';

export class Enrollment {
    id:string;
    student:Student;
    trainingProgram:TrainingProgram;
}