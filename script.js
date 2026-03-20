let categories = [
    {
        name: "Еда",
        words: [
            "пицца",
            "бургер",
            "суши",
            "паста",
            "салат",
            "суп",
            "стейк",
            "картошка",
            "шашлык",
            "омлет",
            "сыр",
            "хлеб",
            "яблоко",
            "банан",
            "шоколад"
        ]
    },

    {
        name: "Животные",
        words: [
            "корова",
            "собака",
            "кот",
            "тигр",
            "лев",
            "медведь",
            "волк",
            "лиса",
            "заяц",
            "слон",
            "жираф",
            "обезьяна",
            "панда",
            "кенгуру",
            "дельфин",
            "акула",
            "кит"
        ]
    },

    {
        name: "Страны",
        words: [
            "украина",
            "израиль",
            "казахтан",
            "беларусь",
            "сша",
            "германия",
            "франция",
            "италия",
            "испания",
            "польша",
            "япония",
            "китай",
            "канада",
            "бразилия",
            "аргентина",
            "австралия",
            "индия"
        ]
    },

    {
        name: "Транспорт",
        words: [
            "машина",
            "автобус",
            "поезд",
            "самолет",
            "велосипед",
            "мотоцикл",
            "трамвай",
            "метро",
            "корабль",
            "лодка",
            "вертолет",
            "скутер",
            "грузовик",
            "такси",
            "самокат"
        ]
    }
];


let randomName = getRandomWord(0, categories.length - 1);
console.log(randomName);

let randomWord = getRandomWord(0, categories[randomName].words.length - 1);
console.log(randomWord);

let selectedCategory = categories[randomName].name;
let secretWord = categories[randomName].words[randomWord];

console.log(`Категория: ${selectedCategory} Слово: ${secretWord}`);


//let randomIndex = getRandomWord(0, words.length - 1);

//let secretWord = words[randomIndex];

//console.log(secretWord);

let secretInput = document.querySelector(".word");
let attemptsText = document.querySelector(".attempts");
let category = document.querySelector(".category");
let newGame = document.querySelector(".new-game");
let checkBtn = document.querySelector(".check-btn");
let userInput = document.querySelector(".input");
let letterNotFound = document.querySelector(".letter-not-found");

category.innerHTML = selectedCategory;

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
    randomName = getRandomWord(0, categories.length - 1);
    console.log(randomName);
    randomWord = getRandomWord(0, categories[randomName].words.length - 1);
    console.log(randomWord);
    selectedCategory = categories[randomName].name;
    category.innerHTML = selectedCategory;
    secretWord = categories[randomName].words[randomWord];
    console.log(`Категория: ${selectedCategory} Слово: ${secretWord}`);
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

    if (letters.indexOf(userText) !== -1) {
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
}
