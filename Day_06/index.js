const fs = require("fs");
const path = require("path");
const races = [];
const bigRace = {};
const accel = 1;

// time in ms
// dist in mm
// accel = 1 mm/ms2

const quadForm = (a, b, c) => {
    let x = [];
    x[0] = Math.ceil(Math.ceil(b - (Math.sqrt(Math.pow(b, 2) - (4 * a * c))))/(2*a));
    x[1] = Math.floor(Math.floor(b + (Math.sqrt(Math.pow(b, 2) - (4 * a * c))))/(2*a));
    return x;
}

const main = async () => {
    const lines = readFile("input.txt");
    let resultP1 = 1;
    let resultP2 = 1;

    // parse
    for (let line of lines) {
        let arr = line.split(/[: ]+/);
        const param = arr[0];
        arr = arr.splice(1);

        for (let i = 0; i < arr.length; i++) {
            races[i] = races[i] ?? {};
            const race = races[i];
            race[param.toLowerCase()] = parseInt(arr[i]);
            bigRace[param.toLowerCase()] = parseInt(arr.join(''));
        }
    }

    // P1
    for (const {time, distance} of races) {
        let timeHeld =  quadForm(accel, time, distance + 1);
        resultP1 *= timeHeld[1] - timeHeld[0] + 1;
    }

    // P2
    let timeHeld =  quadForm(accel, bigRace['time'], bigRace['distance'] + 1);
    resultP2 = timeHeld[1] - timeHeld[0] + 1;

    console.log(`P1: ${resultP1}`);
    console.log(`P2: ${resultP2}`);
};

const readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), "utf8").split("\n");

main();
