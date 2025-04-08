const quizData = [
    ["すべて選択", "[Ctrl] + [A]"],
    ["上書き保存", "[Ctrl] + [S]"],
    ["コピー", "[Ctrl] + [C]"],
    ["切り取り", "[Ctrl] + [X]"],
    ["貼り付け", "[Ctrl] + [V]"],
    ["元に戻る", "[Ctrl] + [Z]"],
    ["「元に戻る」のやり直し", "[Ctrl] + [Y]"],
    ["検索", "[Ctrl] + [F]"],
    ["印刷", "[Ctrl] + [P]"],
    ["新規作成", "[Ctrl] + [N]"],
    ["開く", "[Ctrl] + [O]"],
    ["閉じる", "[Ctrl] + [W]"],
    ["置換", "[Ctrl] + [H]"],
    ["ゴミ箱に移動", "[Ctrl] + [D]"],
    ["最新の情報に更新", "[Ctrl] + [R]"],
    ["ソフトの強制終了", "[Ctrl] + [Alt] + [Del]"],
    ["タスクマネージャーの起動", "[Ctrl] + [Shift] + [Esc]"],
    ["拡大・縮小", "[Ctrl] + マウスホイール"],
    ["複数選択", "[Ctrl] + クリック"],
    ["方向の単語・段落に移動", "[Ctrl] + [↑][↓][←][→]"],
    ["前に戻る", "[Alt] + [←]"],
    ["次に進む", "[Alt] + [→]"],
    ["ウインドウの切り替え", "[Alt] + [Tab]"],
    ["プロパティを表示", "[Alt] + [Enter]"],
    ["使用中の項目を閉じる", "[Alt] + [F4]"],
    ["ショートカットメニューを表示", "[Alt] + [Space]"],
    ["スタートメニューを表示", "[Windowsキー]"],
    ["エクスプローラーを表示", "[Windowsキー] + [E]"],
    ["全てのウインドウを最小化", "[Windowsキー] + [M]"],
    ["「ファイル名を指定して実行」を表示", "[Windowsキー] + [R]"],
    ["PCをロック", "[Windowsキー] + [L]"],
    ["デスクトップを表示", "[Windowsキー] + [D]"],
    ["ごみ箱に移動せずに削除", "[Shift] + [Del]"],
    ["入力欄の逆移動", "[Shift] + [Tab]"],
    ["入力欄の移動", "[Tab]"],
    ["文字選択", "[Shift] + [↑][↓][←][→]"],
    ["範囲で選択", "[Shift] + クリック"],
    ["右クリックメニューを表示", "[Shift] + [F10]"],
    ["ヘルプを開く", "[F1]"],
    ["ファイル名・フォルダ名を変更", "[F2]"],
    ["ファイルまたはフォルダを検索", "[F3]"],
    ["アドレスバーリストを表示", "[F4]"],
    ["作業ウィンドウを最新に更新", "[F5]"],
    ["ひらがなに変換", "[F6]"],
    ["全角カタカナに変換", "[F7]"],
    ["半角カタカナに変換", "[F8]"],
    ["全角英数に変換", "[F9]"],
    ["半角英数に変換", "[F10]"],
    ["現在の作業を停止・終了", "[Esc]"],
    ["全画面スクリーンショット", "[PrintScreen]"],
    ["アクティブなウインドウをスクリーンショット", "[Alt] + [PrintScreen]"]
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
