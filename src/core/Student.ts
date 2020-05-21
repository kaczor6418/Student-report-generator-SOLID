import {StudentData} from "../common/interfaces/StudentData";

export class Student implements StudentData {
    firstName: string;
    grades: number[];
    indexNumber: number;
    lastName: string;

    constructor({ firstName, grades, indexNumber, lastName }: StudentData) {
        this.firstName = firstName;
        this.grades = grades;
        this.indexNumber = indexNumber;
        this.lastName = lastName;
    }
}
