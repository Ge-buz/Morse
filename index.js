let coded = document.getElementById("coded")
let decoded = document.getElementById("decoded")
let final = document.getElementById("final")

const pulse = 115; //menos es dot, mas es dash
let stopWord = 0;
let lastPress = 0;
let timer = 0 // timer
let finalSentence = [];
let decodedChars = [] // letras decodificadas por separado 
let morseChar = [] // dots y dashes 
let keys = {}; //guarda el momento en el que se apretó la tecla
const morseCode = {
    "._": "A",
    "_...": "B",
    "_._.": "C",
    "____": "CH",
    "_..": "D",
    ".": "E",
    ".._.": "F",
    "__.": "G",
    "....": "H",
    "..": "I",
    ".___": "J",
    "_._": "K",
    "._..": "L",
    "__": "M",
    "_.": "N",
    "__.__": "Ñ",
    "___": "O",
    ".__.": "P",
    "__._": "Q",
    "._.": "R",
    "...": "S",
    "_": "T",
    ".._": "U",
    "..._": "V",
    ".__": "W",
    "_.._": "X",
    "_.__": "Y",
    "__..": "Z",
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
    if (lastPress !== 0 && timer - lastPress > pulse * 6 && morseChar.length) {
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
        final.innerText = final.innerText + finalSentence
        decoded.innerText = ""
    }

    if (key === "x" || key === "X") finalSentence = ""

}

const dotOrDash = (press, key) => {
    if (key === "Backspace") { decodedChars?.pop(); decoded.innerText = decodedChars.join('') }
    if (morseChar.length <= 5 && press <= pulse * 7) {
        if (key === "v" || key === "V")  //
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