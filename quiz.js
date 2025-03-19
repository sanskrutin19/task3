// Class for Quiz Question
class Question {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    // Check if selected answer is correct
    checkAnswer(selectedAnswer) {
        return selectedAnswer === this.correctAnswer;
    }
}

// Class for the Quiz
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.userAnswers = {};
    }

    // Display the quiz questions
    displayQuestions() {
        const quizContainer = document.getElementById("quiz");
        quizContainer.innerHTML = "";
        this.questions.forEach((q, index) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("question");
            questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

            const optionsElement = document.createElement("div");
            optionsElement.classList.add("options");

            q.options.forEach(option => {
                const optionDiv = document.createElement("div");
                optionDiv.classList.add("option");
                optionDiv.textContent = option;

                // Handle selection
                optionDiv.addEventListener("click", () => {
                    // Remove previous selection
                    const allOptions = optionsElement.querySelectorAll(".option");
                    allOptions.forEach(opt => opt.classList.remove("selected"));

                    // Mark selected option
                    optionDiv.classList.add("selected");
                    this.userAnswers[index] = option;

                    // Auto-scroll to next question
                    this.scrollToNextQuestion(index);
                });

                optionsElement.appendChild(optionDiv);
            });

            questionElement.appendChild(optionsElement);
            quizContainer.appendChild(questionElement);
        });
    }

    // Scroll to the next question smoothly
    scrollToNextQuestion(currentIndex) {
        setTimeout(() => {
            const nextQuestion = document.querySelectorAll(".question")[currentIndex + 1];
            if (nextQuestion) {
                nextQuestion.scrollIntoView({ behavior: "smooth" });
            }
        }, 500);
    }

    // Calculate the user's score
    calculateScore() {
        this.score = 0;
        this.questions.forEach((q, index) => {
            const selectedAnswer = this.userAnswers[index];
            if (selectedAnswer && q.checkAnswer(selectedAnswer)) {
                this.score++;
            }
        });

        // Display the result
        this.displayResult();
    }

    // Display feedback using a switch statement
    displayResult() {
        const resultContainer = document.getElementById("result");
        resultContainer.innerHTML = `Your Score: ${this.score} / ${this.questions.length}`;

        switch (true) {
            case this.score === this.questions.length:
                resultContainer.innerHTML += "<p>Excellent! 🎉</p>";
                break;
            case this.score >= this.questions.length / 2:
                resultContainer.innerHTML += "<p>Good Job! 👍</p>";
                break;
            default:
                resultContainer.innerHTML += "<p>Keep Practicing! 😊</p>";
        }
    }
}

// Create quiz questions
const questions = [
    new Question("What is the capital of France?", ["Berlin", "Madrid", "Paris", "Rome"], "Paris"),
    new Question("Which planet is known as the Red Planet?", ["Earth", "Mars", "Jupiter", "Venus"], "Mars"),
    new Question("What is the largest ocean on Earth?", ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"], "Pacific Ocean"),
    new Question("Who wrote 'Hamlet'?", ["Shakespeare", "Dickens", "Austen", "Hemingway"], "Shakespeare"),
    new Question("What is the square root of 64?", ["6", "7", "8", "9"], "8")
];

// Initialize the Quiz
const quiz = new Quiz(questions);
quiz.displayQuestions();

// Submit button event listener
document.getElementById("submit-btn").addEventListener("click", () => {
    quiz.calculateScore();
});
