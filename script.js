const startButton = document.querySelector('#start-btn');
startButton.addEventListener('click', startGame);

const questionContainerElement = document.querySelector('#question-container');


let shuffledQuestions, currentQuestionIndex;

const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('#answer-buttons');

const nextButton = document.querySelector('#next-btn');
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})



function startGame() {
    // console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');   
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    
}

function setStatusClass(element,correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions = [
    {
        question: 'What is 2+2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'What is 4*2?',
        answers: [
            { text: '4', correct: false },
            { text: '8', correct: true },
            { text: '16', correct: false },
            { text: '64', correct: false}
        ]
    },
    {
        question: 'Where is TSEC?',
        answers: [
            { text: 'Thane', correct: false },
            { text: 'Ghatkopar', correct: false },
            { text: 'Goregaon', correct: false },
            { text: 'Bandra', correct: true}
        ]
    },
    {
        question: '(5+3)*5=?',
        answers: [
            { text: '4', correct: false },
            { text: '20', correct: false },
            { text: '40', correct: true },
            { text: '25', correct: false}
        ]
    }
]