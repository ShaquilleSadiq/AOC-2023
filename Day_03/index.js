const fs = require("fs");
const path = require("path");

const checkNeighbourIsSymbol = (lines, i, j) => {
    let isValidY = i >= 0 && i < lines.length;
    let isValidX = isValidY && j >= 0 && j < lines[i].length;

    if (isValidY && isValidX) {
        let char = lines[i][j];
        return isNaN(parseInt(char)) && char !== '.';
    }

    return false;
}

const checkNeighbourIsNumber = (lines, i, j) => {
    let isValidY = i >= 0 && i < lines.length;
    let isValidX = isValidY && j >= 0 && j < lines[i].length;

    if (isValidY && isValidX) {
        let char = lines[i][j];
        return !isNaN(parseInt(char));
    }

    return false;
}

const getFullDigit = (lines, i, j) => {
    let indexStart = j;
    let indexEnd = j;

    if ((i >= 0 && i < lines.length) && (j >= 0 && j < lines[i].length)) {
        for (let k = j; k >= 0; k--) {
            let char = parseInt(lines[i][k]);
            if (isNaN(char)) break;
            indexStart = k;
        }

        for (let k = j; k < lines[i].length; k++) {
            let char = parseInt(lines[i][k]);
            if (isNaN(char)) break;
            indexEnd = k+1;
        }
    }

    const number = parseInt(lines[i].substring(indexStart, indexEnd));

    return {number, j: indexEnd};
}

const getAdjacentIndices = (i,j) => {
    const directions = [
        [i-1, j], // up
        [i+1, j], // down
        [i, j-1], // left
        [i, j+1], // right
        [i-1, j-1], // up_left
        [i-1, j+1], // up_right
        [i+1, j-1], // down_left
        [i+1, j+1], // down_right
    ];

    return directions;
}

const p1 = async () => {
    const lines = readFile("input.txt");
    let total = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        for (let j = 0; j < line.length; j++) {
            let char = parseInt(line[j]);
            if (isNaN(char)) continue;
            const adjacentIndices = getAdjacentIndices(i, j);

            for(const [x, y] of adjacentIndices) {
                if (checkNeighbourIsSymbol(lines, x, y)) {
                    let data = getFullDigit(lines, i, j);
                    j = data.j;
                    total += data.number;
    
                    break;
                }
            }
        }
    }

    console.log('P1: ' + total);
};


const p2 = async () => {
    const lines = readFile("input.txt");
    let total = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        for (let j = 0; j < line.length; j++) {
            let char = line[j];
            if (char !== '*') continue;
            let gear = [];

            const adjacentIndices = getAdjacentIndices(i, j);

            for(const [x, y] of adjacentIndices) {
                if (checkNeighbourIsNumber(lines, x, y)) {
                    let data = getFullDigit(lines, x, y);
                    gear.push(data.number);
                }
            }

            gear = [...new Set(gear)];

            if (gear.length === 2) {
                total += gear[0] * gear[1];
            }
        }
    }

    console.log('P2: ' + total);
};

const readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), "utf8").split("\n");

p1();
p2();
