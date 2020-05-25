export class Course {

    courseId: string;
    courseName: string;
    noOfDays: number;

    constructor(id: string, name: string, days: number) {
        this.courseId = id;
        this.courseName = name;
        this.noOfDays = days;
    }
}
