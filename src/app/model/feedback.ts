import { Student } from './student';
import { TrainingProgram } from './training-program';
import { User } from './user';

export class Feedback{
    id:number;
    user:User;
    trainingProgram:TrainingProgram;
    criteriaFirst:string;
    criteriaSecond:string;
    criteriaThird:string;
    criteriaFourth:string;
    criteriaFifth:string;

    constructor(user:User,trainingprogram:TrainingProgram,criteriaFirst:string,criteriaSecond:string,criteriaThird:string,criteriaFourth:string,criteriaFifth:string){
        this.id=null;
        this.user=user;
        this.trainingProgram=trainingprogram;
        this.criteriaFifth=criteriaFifth;
        this.criteriaFirst=criteriaFirst;
        this.criteriaFourth=criteriaFourth;
        this.criteriaSecond=criteriaSecond;
        this.criteriaThird=criteriaThird;
    }
    
}