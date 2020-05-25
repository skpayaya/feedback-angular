export class Trainer {
    trainerId:string;
    trainerName:string;
    skill:string[];
    constructor(id:string) {
        this.trainerId=id;
        this.trainerName='';
        this.skill=null;
    }
}
