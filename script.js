'use strict';

class Group {
    constructor () {
        this._studentsArr = [];
        this.students = this._studentsArr;
    }

    addStudent(student) {
        if (typeof student === 'object' && student !== null) {
            this._studentsArr.push(student);
        }
        return this;
    }

    getAverageMark() {
        let marks = this._studentsArr.flatMap(arr => arr.marks);
        return Math.floor(marks.reduce((acc, mark) => acc + mark, 0) / marks.length);
    }
}

class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }
}

const feGroup = new Group();
const firstStudent = new Student('Jimmy Joe', [10, 102, 0]);

feGroup.addStudent(new Student('John Doe', [10, 10, 5, 10]));
feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));
feGroup.addStudent(firstStudent);

console.log(feGroup.students); // [{},{},{}]

console.log(feGroup.getAverageMark()); // 15
