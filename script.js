//https://disk.360.yandex.ru/i/2HzIq0bslX4Taw

let words = [
    "кот",
    "машина",
    "дерево",
    "облако",
    "телефон",
    "река",
    "книга",
    "солнце",
    "окно",
    "лампа",
    "арбуз",
    "банан",
    "груша",
    "персик",
    "слива",
    "вишня",
    "ягода",
    "морковь",
    "картофель",
    "огурец",
    "помидор",
    "капуста",
    "лук",
    "чеснок",
    "перец",
    "хлеб",
    "молоко",
    "сыр",
    "масло",
    "яйцо",
    "чашка",
    "тарелка",
    "ложка",
    "вилка",
    "нож",
    "стол",
    "стул",
    "диван",
    "кровать",
    "шкаф",
    "дверь",
    "стена",
    "потолок",
    "пол",
    "лампочка",
    "зеркало",
    "часы",
    "рюкзак",
    "сумка",
    "куртка",
    "шапка",
    "ботинки",
    "носки",
    "рубашка",
    "брюки",
    "футболка",
    "телевизор",
    "компьютер",
    "клавиатура",
    "мышка"
]

let randomIndex = getRandomWord(0, words.length - 1);

let secretWord = words[randomIndex];

console.log(secretWord);

let secretInput = document.querySelector(".word");
let attemptsText = document.querySelector(".attempts");
let newGame = document.querySelector(".new-game");
let checkBtn = document.querySelector(".check-btn");
let userInput = document.querySelector(".input");
let letterNotFound = document.querySelector(".letter-not-found");

let attempts = 5;

let letters = [];
let notCorrectLetter = [];

function getRandomWord(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

userInput.focus();
newGame.disabled = true;

newGame.onclick = function () {
    attempts = 5;
    attemptsText.innerHTML = attempts;
    letters = [];
    secretInput.value = "";
    randomIndex = getRandomWord(0, words.length - 1);
    secretWord = words[randomIndex];
    console.log(secretWord);
    checkBtn.disabled = false;
    newGame.disabled = true;
    userInput.disabled = false;
    letterNotFound.value = "";
    notCorrectLetter = [];
    userInput.focus();
};

checkBtn.onclick = function () {
    let userText = userInput.value;
    userText = userText.toLowerCase();

    if (userText === "") {
        alert("Введите букву");
        return;
    }

    if (userText.length !== 1) {
        alert("Введите только одну букву");
        return;
    }

    if (letters.indexOf(userText) !== -1){
        alert(`Введите другую букву "${userText}" уже введена`);
        userInput.value = "";
        return;
    }

    letters.push(userText);
    console.log(letters);

    if (secretWord.indexOf(userText) === -1) {
        attempts = attempts - 1;
        attemptsText.innerHTML = attempts;
        notCorrectLetter.push(userText);
        letterNotFound.value = notCorrectLetter; 
    }

    let questWord = "";
    //for (let i = 0; i < secretWord.length; i++) {
    for (char of secretWord) {

        if (letters.indexOf(char) != -1) {
            questWord = questWord + char;
        }
        else {
            questWord = questWord + "*";
        }
    }
    //console.log(questWord);
    userInput.value = "";
    secretInput.value = questWord;

    if (attempts === 0) {
        alert("Вы проиграли");
        secretInput.value = secretWord;
        newGame.disabled = false;
        checkBtn.disabled = true;
        userInput.disabled = true;
    }

    if (secretWord === questWord) {
        alert("Победа");
        newGame.disabled = false;
        checkBtn.disabled = true;
        userInput.disabled = true;
    }

};