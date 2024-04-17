let coded = document.getElementById("coded")
let decoded = document.getElementById("decoded")

console.log(document.getElementById('bananas'))
console.log(document.getElementById("decoded"))

const pulse = 115; //menos es dot, mas es dash
let stopWord = 0;
let lastPress = 0;
let timer = 0 // timer
let finalSentence = [];
let decodedChars = [] // letras decodificadas por separado 
let morseChar = [] // dots y dashes 
let keys = {}; //guarda el momento en el que se apretó la tecla
const morseCode = {
    "._": "a",
    "_...": "b",
    "_._.": "c",
    "____": "ch",
    "_..": "d",
    ".": "e",
    ".._.": "f",
    "__.": "g",
    "....": "h",
    "..": "i",
    ".___": "j",
    "_._": "k",
    "._..": "l",
    "__": "m",
    "_.": "n",
    "__.__": "ñ",
    "___": "o",
    ".__.": "p",
    "__._": "q",
    "._.": "r",
    "...": "s",
    "_": "t",
    ".._": "u",
    "..._": "v",
    ".__": "w",
    "_.._": "x",
    "_.__": "y",
    "__..": "z",
    "_____": "0",
    ".____": "1",
    "..___": "2",
    "...__": "3",
    "...._": "4",
    ".....": "5",
    "_....": "6",
    "__...": "7",
    "___..": "8",
    "____.": "9",
    "._._._": ".",
    "__..__": ",",
    "..__..": "?",
}

const checkForStopChar = (timer, lastPress) => {
    if (lastPress !== 0 && timer - lastPress > pulse * 10 && morseChar.length) {
        if (morseCode[morseChar.join('')]) {
            decodedChars.push(morseCode[morseChar.join('')]);
            decoded.innerText = decodedChars.join('');
            morseChar = [];
            lastPress = 0;

        } else {
            decoded.innerText = "Wrong Character";
            morseChar = [];
            lastPress = 0;
        }
    };
}

const checkForStopWord = (key) => {
    if (key === "Enter" && decodedChars.length) {
        finalSentence = finalSentence + decodedChars.join('') + " ";
        decodedChars = [];
        decoded.innerText = decoded.innerText + finalSentence
        console.log("Sentence", finalSentence)
    }

}

const dotOrDash = (press, key) => {
    if (key === "Backspace") { decodedChars?.pop(); console.log("clear"); }
    if (morseChar.length <= 5 && press <= pulse * 7) {
        if (key === "b")  //
            if (press >= pulse * 2) {
                morseChar.push("_");
            } else if (press <= pulse * 2) morseChar.push(".");
        coded.innerText = morseChar.join(' ')

    } else {
        coded.innerText = "Wrong Character, try again";
        morseChar = [];
        lastPress = 0;
    }
}

// const clearWord = (press) => {
//     if (press >= pulse * 7) morseChar = [];
// }

setInterval(() => {
    timer = Date.now()
    checkForStopChar(timer, lastPress);

}, 115)

document.addEventListener("keydown", ({ key }) => {
    if (!keys[key]) keys[key] = Date.now();
});
document.addEventListener("keyup", ({ key }) => {
    checkForStopWord(key);
    dotOrDash(Date.now() - keys[key], key);
    lastPress = keys[key];

    keys[key] = null;

});





// +3 - 7 UT

// setTimeout((1000)=>{

// })