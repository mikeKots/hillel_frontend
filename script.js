const students = [
    {
        id:10,
        name: 'John Smith',
        marks: [10, 8, 6, 9, 8, 7 ]
    },
    {
        id:11,
        name: 'John Doe',
        marks: [ 9, 8, 7, 6, 7 ]
    },
    {
        id:12,
        name: 'Thomas Anderson',
        marks: [6, 7, 10, 8 ]
    },
    {
        id:13,
        name: 'Jean-Baptiste Emanuel Zorg',
        marks: [10, 9, 8, 9 ]
    }
]
averageStudentMark(10, students); 


averageGroupMark(students);


function averageStudentMark(studentId, students) {
    const student = students.find(({id}) => id === studentId);
    if (!student) {
        return "There is no student with such Id";
    }
    return student.marks.reduce((acc, current) => acc + current) / student.marks.length
}

function averageGroupMark(students) {
    const studentsMarks = students.map((marksArray) => marksArray.marks).flat();
    return studentsMarks.reduce((acc, index) => acc + index) / studentsMarks.length;
}