const quizData = [
    ["すべて選択", "[Ctrl] + [A]"],
    ["上書き保存", "[Ctrl] + [S]"],
    ["コピー", "[Ctrl] + [C]"],
    ["切り取り", "[Ctrl] + [X]"],
    ["貼り付け", "[Ctrl] + [V]"],
    ["元に戻る","[Ctrl] + [Z]"],
    ["「元に戻る」のやり直し","[Ctrl] + [Y]"],
];

let currentQuestionIndex = 0;
let shuffledQuestions = [];
let correctAnswers = 0; // 正解数
let totalQuestions = 0; // 総出題数

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateAnswers(correctAnswer) {
    let allAnswers = quizData.map(item => item[1]);
    let wrongAnswers = allAnswers.filter(answer => answer !== correctAnswer);
    let selectedAnswers = shuffleArray(wrongAnswers).slice(0, 3);
    selectedAnswers.push(correctAnswer);
    return shuffleArray(selectedAnswers);
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `スコア: ${correctAnswers}/${totalQuestions}`;
}

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const resultElement = document.getElementById("result");

    resultElement.textContent = ""; // 結果をリセット
    answersElement.innerHTML = ""; // 選択肢をリセット

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const questionText = currentQuestion[0];
    const correctAnswer = currentQuestion[1];
    const answers = generateAnswers(correctAnswer);

    questionElement.textContent = questionText;

    answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => {
            totalQuestions++; // 総出題数を回答時に増やす
            if (answer === correctAnswer) {
                resultElement.textContent = "正解!";
                resultElement.className = "correct";
                correctAnswers++; // 正解数を増やす
            } else {
                resultElement.textContent = `不正解! 正解は ${correctAnswer} です。`;
                resultElement.className = "incorrect";
            }
            updateScore(); // スコアを更新
        };
        answersElement.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        alert("クイズ終了!");
        location.reload(); // ページをリロードして最初から
    }
}

document.getElementById("next-button").onclick = nextQuestion;

window.onload = () => {
    shuffledQuestions = shuffleArray(quizData);
    displayQuestion();
};
