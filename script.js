const questionPool = [
    {
        id:1,
        question: 'Сколько будет 2+2?',
        question_type: 'complex',
        correct_answer: '4'
    },
    {
        id:2,
        question: 'Солнце встает на востоке?',
        question_type: 'simple',
        correct_answer: true
    },
    {
        id:3,
        question: 'Сколько будет 5 / 0?',
        question_type: 'complex',
        correct_answer: 'infinity'
    },
    {
        id:4,
        question: 'Какого цвета небо?',
        question_type: 'complex',
        correct_answer: 'blue'
    },
    {
        id:5,
        question: 'Как правильный ответ на главный вопрос жизни, вселенной и всего такого.',
        question_type: 'complex',
        correct_answer: '42'
    }
]


askQuestion(questionPool);

function askQuestion(questionPool) {
    let sumOfAnswers = [];
    questionPool.forEach((item, index) => {
        switch(item.question_type) {
            case 'complex' : setPointsForQuestion(prompt(item.question, ''), sumOfAnswers, item);
            break;

            case 'simple' : setPointsForQuestion(confirm(item.question), sumOfAnswers, item);
            break;

            default : null;
            break;
        }
    });

    result = sumOfAnswers.reduce((acc, index) => acc + index);

    alert( 'Ваш результат: ' + result);
    return result;
}

function setPointsForQuestion(question, sumOfAnswers, item) {
        return question ===  item.correct_answer ? sumOfAnswers.push(10) : sumOfAnswers.push(0);
}