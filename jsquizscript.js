let questions = [
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        answers: [
            { text: "interface", correct: false },
            { text: "throws", correct: false },
            { text: "program", correct: true },
            { text: "short", correct: false },
        ]
    },
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below? <p id='demo'>This is a demonstration.</p>",
        answers: [
            { text: "document.getElementByName('p').innerHTML = 'Hello World!';", correct: false },
            { text: "document.getElementById('demo').innerHTML = 'Hello World!';", correct: true },
            { text: "#demo.innerHTML = 'Hello World!';", correct: false },
            { text: "document.getElement('p').innerHTML = 'Hello World!';", correct: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "msgBox('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false },
            { text: "msg('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true },
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function:myFunction()", correct: false },
            { text: "function = myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "myFunction():function", correct: false },
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            { text: "if i = 5", correct: false },
            { text: "if i == 5 then", correct: false },
            { text: "if (i == 5)", correct: true },
            { text: "if i = 5 then", correct: false },
        ]
    },
    {
        question: "How does a WHILE loop start?",
        answers: [
            { text: "while (i <= 10; i++)", correct: false },
            { text: "while i = 1 to 10", correct: false },
            { text: "while (i <= 10)", correct: true },
            { text: "while i <= 10", correct: false },
        ]
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: [
            { text: "'This is a comment", correct: false },
            { text: "//This is a comment", correct: true },
            { text: "&lt!--This is a comment--&gt", correct: false },
            { text: "# This is a comment", correct: false },
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false },
            { text: "var colors = 'red', 'green', 'blue'", correct: false },
            { text: "var colors = ['red', 'green', 'blue']", correct: true },
            { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false },
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onmouseclick", correct: false },
            { text: "onchange", correct: false },
            { text: "onclick", correct: true },
            { text: "onmouseover", correct: false },
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: "variable carName;", correct: false },
            { text: "v carName;", correct: false },
            { text: "var carName;", correct: true },
            { text: "var = carName;", correct: false },
        ]
    },
];

// Randomize the order of the questions
questions = questions.sort(() => Math.random() - 0.5);

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    let percentage = Math.round((score / questions.length) * 100).toFixed(1);
    questionElement.innerHTML = `Your score: ${percentage}%. ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Retake Quiz";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
});

startQuiz();