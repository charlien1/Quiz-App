let questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Tool Markup Language", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        answers: [
            { text: "&lt;footer&gt;", correct: true },
            { text: "&lt;bottom&gt;", correct: false },
            { text: "&lt;section&gt;", correct: false },
            { text: "&lt;div&gt;", correct: false },
        ]
    },
    {
        question: "Which HTML attribute is used to specify that an input field must be filled out?",
        answers: [
            { text: "placeholder", correct: false },
            { text: "required", correct: true },
            { text: "formvalidate", correct: false },
            { text: "validate", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to define important text?",
        answers: [
            { text: "&lt;important&gt;", correct: false },
            { text: "&lt;b&gt;", correct: false },
            { text: "&lt;strong&gt;", correct: true },
            { text: "&lt;i&gt;", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to define a hyperlink?",
        answers: [
            { text: "&lt;link&gt;", correct: false },
            { text: "&lt;a&gt;", correct: true },
            { text: "&lt;url&gt;", correct: false },
            { text: "&lt;web&gt;", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to define a list item?",
        answers: [
            { text: "&lt;li&gt;", correct: true },
            { text: "&lt;item&gt;", correct: false },
            { text: "&lt;list&gt;", correct: false },
            { text: "&lt;ul&gt;", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to define metadata about an HTML document?",
        answers: [
            { text: "&lt;meta&gt;", correct: true },
            { text: "&lt;data&gt;", correct: false },
            { text: "&lt;info&gt;", correct: false },
            { text: "&lt;metadata&gt;", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to define a table cell?",
        answers: [
            { text: "&lt;cell&gt;", correct: false },
            { text: "&lt;td&gt;", correct: true },
            { text: "&lt;tabledata&gt;", correct: false },
            { text: "&lt;data&gt;", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to define a drop-down list?",
        answers: [
            { text: "&lt;dropdown>", correct: false },
            { text: "&lt;list>", correct: false },
            { text: "&lt;select>", correct: true },
            { text: "&lt;option>", correct: false },
        ]
    },
    {
        question: "Which HTML element is used to define a form for user input?",
        answers: [
            { text: "&lt;input>", correct: false },
            { text: "&lt;form>", correct: true },
            { text: "&lt;userinput>", correct: false },
            { text: "&lt;textfield>", correct: false },
        ]
    }
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