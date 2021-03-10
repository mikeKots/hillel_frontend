const STUDENTS_API = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/students/';

const $marksTemplate = $('#marksTemplate').html();
const $marksTable = $('#marksTable');
const $addStudentEl = $('#addStudentBtn');
const $addStudentInput = $('#addStudentInput');
const $deleteButton = $('.deleteBtn');
const emptyMarks = [0,0,0,0,0,0,0,0,0,0];

const resourceModel = new Http(STUDENTS_API);

$addStudentEl.on('click', onAddBtnClick);
let list = [];

init();

function init() {
    getList();
}

function getList() {
    resourceModel.get().then(setData).then(renderList);
}

function renderList(data) {
    $marksTable.html(data.map(getItemElementHtml).join(''));
    $('.deleteBtn').each((_, element) => {
        $(element).on('click', deleteStudent);
    })

    $('.item').each((_, element) => {
        $(element).on('focusout', editMark);
    })
}

function getItemElementHtml(item) {
    return $marksTemplate
        .replace('{{id}}', item.id)
        .replace('{{name}}', item.name)
        .replace('{{0}}', item.marks[0])
        .replace('{{1}}', item.marks[1])
        .replace('{{2}}', item.marks[2])
        .replace('{{3}}', item.marks[3])
        .replace('{{4}}', item.marks[4])
        .replace('{{5}}', item.marks[5])
        .replace('{{6}}', item.marks[6])
        .replace('{{7}}', item.marks[7])
        .replace('{{8}}', item.marks[8])
        .replace('{{9}}', item.marks[9])
}

function setData(data) {
    return (list = data);
}

function deleteStudent(e) {
    const id = +e.target.closest('.item').dataset.id
    return resourceModel.delete(id).then(() => getList())
}

function onAddBtnClick() {
    const newStudent = {
        name: addStudentInput.value,
        marks: emptyMarks
    }
    return resourceModel.create(newStudent).then(() => getList());
}

function editMark(e) {
    const id = +e.target.closest('tr').dataset.id;
    const index = e.target.closest('td').cellIndex -1;
    const studentMark = e.target.value;
    const student = list.find((item) => item.id == id);
    student.marks[index] = studentMark;
    resourceModel.update(id, student);
}