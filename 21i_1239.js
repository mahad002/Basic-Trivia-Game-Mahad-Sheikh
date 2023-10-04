let questions = [];
let currentQuestion = 0;
let score = 0;

function fetchQuestions() {
    const apiUrl = "https://the-trivia-api.com/api/questions";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    const combinedOptions = [...questions[currentQuestion].incorrectAnswers, questions[currentQuestion].correctAnswer];
    combinedOptions.sort(() => Math.random() - 0.5); // Shuffle options

    questionElement.innerText = questions[currentQuestion].question;

    optionsElement.innerHTML = "";
    combinedOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endGame();
    }
    updateScore();
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = `Score: ${score}`;
}

function endGame() {
    const container = document.querySelector('.container');
container.innerHTML = `<h1>Game Over</h1>
                        <p>Your score is: ${score}</p>
                        <button id="newGame" onclick="startNewGame()" style="visibility:visible">Start New Game</button>`;

}

function startNewGame() {
    currentQuestion = 0;
    score = 0;
    fetchQuestions();
    location.reload();
}

document.getElementById('newGame').addEventListener('click', startNewGame);

fetchQuestions();
