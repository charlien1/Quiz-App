let questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Cascading Style Scripts", correct: false },
            { text: "Cascading Simple Scripts", correct: false },
        ]
    },
    {
        question: "Which property is used to change the background color?",
        answers: [
            { text: "color", correct: false },
            { text: "bg-color", correct: false },
            { text: "background-color", correct: true },
            { text: "bgcolor", correct: false },
        ]
    },
    {
        question: "How do you add a background image using CSS?",
        answers: [
            { text: "background-image: url(image.png)", correct: true },
            { text: "bg-image: url(image.png)", correct: false },
            { text: "background: url(image.png)", correct: false },
            { text: "bg: url(image.png)", correct: false },
        ]
    },
    {
        question: "Which property is used to change the text color of an element?",
        answers: [
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "font-color", correct: false },
            { text: "text-style", correct: false },
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "text-size", correct: false },
            { text: "font-size", correct: true },
            { text: "text-style", correct: false },
            { text: "font-style", correct: false },
        ]
    },
    {
        question: "How do you make each word in a text start with a capital letter?",
        answers: [
            { text: "text-transform: capitalize", correct: true },
            { text: "text-style: capitalize", correct: false },
            { text: "font: capitalize", correct: false },
            { text: "transform: capitalize", correct: false },
        ]
    },
    {
        question: "Which property is used to change the font of an element?",
        answers: [
            { text: "font-family", correct: true },
            { text: "text-style", correct: false },
            { text: "text-family", correct: false },
            { text: "font-style", correct: false },
        ]
    },
    {
        question: "How do you make the text bold?",
        answers: [
            { text: "font-weight: bold", correct: true },
            { text: "text-style: bold", correct: false },
            { text: "font: bold", correct: false },
            { text: "style: bold", correct: false },
        ]
    },
    {
        question: "How do you display hyperlinks without an underline?",
        answers: [
            { text: "text-decoration: none", correct: true },
            { text: "text-style: no-underline", correct: false },
            { text: "decoration: none", correct: false },
            { text: "style: no-underline", correct: false },
        ]
    },
    {
        question: "How do you select an element with id 'demo'?",
        answers: [
            { text: ".demo", correct: false },
            { text: "#demo", correct: true },
            { text: "demo", correct: false },
            { text: "*demo", correct: false },
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