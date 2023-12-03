const fs = require("fs");
const path = require("path");

const DIGITS = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
}

const p1 = async () => {
    const lines = readFile("input.txt");
    let total = 0;

    for (let line of lines) {
        let num = [];

        for (let char of line) {
            if(!isNaN(parseInt(char))){
                if(num.length == 0) num[0] = char;
                num[1] = char;
            }
        }

        num = num.length > 0 ? parseInt(num.join('')) : 0;

        total += num;
    }

    console.log("P1: " + total);
};

const p2 = async () => {
    const lines = readFile("input.txt");
    let total = 0;

    const replaceDigits = (num, line, i, repIdx) => {
        let char = line[i];
        let digit;
        const str = line.substring(i);

        // get numbers
        if(!isNaN(parseInt(char))){ 
            num[repIdx] = char;
            return true;
        }

        // replace words
        Object.entries(DIGITS).some(([word]) => {
            if(str.startsWith(word)){
                digit = word;
                return true;
            }
        });


        if(digit) {
            line = line.replace(digit, DIGITS[digit]);
            num[repIdx] = DIGITS[digit];
            return true;
        }

        return false;
    }

    for (let line of lines) {
        let num = [0, 0];

        // first digit
        for (let i = 0; i < line.length; i++) if(replaceDigits(num, line, i, 0)) break;

        // last digit
        for (let i = line.length-1; i >= 0; i--) if(replaceDigits(num, line, i, 1)) break;

        num = parseInt(num.join(''));

        total += num;
    }
    console.log("P2: " + total);
};


const readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), "utf8").split("\n");

p1();
p2();
