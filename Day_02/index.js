const fs = require("fs");
const path = require("path");

const p1 = async () => {
    const lines = readFile("input.txt");
    const searchNums = {
        red: 12,
        green: 13,
        blue: 14,
    };
    const results = {};

    for (let line of lines) {
        let arr = line.split(': ');
        let gameID = arr[0].split(' ')[1];
        let group = arr[1].split('; ');
        results[gameID] = true;

        for(let i = 0; i < group.length; i++){
            let sets = group[i].split(', ');

            for(let j = 0; j < sets.length; j++){
                let cubes = sets[j].split(' ');
                let cubeCnt = parseInt(cubes[0]);
                let cubeColor = cubes[1];

                if (cubeCnt > searchNums[cubeColor]) delete results[gameID];
            }
        }
    }

    const sum = Object.keys(results).reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0);
    console.log("P1: " + sum);
};

const p2 = async () => {
    const lines = readFile("input.txt");
    let sum = 0;

    for (let line of lines) {
        let arr = line.split(': ');
        let gameID = arr[0].split(' ')[1];
        let group = arr[1].split('; ');

        const lineMaxes = {
            red: 0,
            green: 0,
            blue: 0,
        };

        // e.g. [ '3 blue, 4 red', '1 red, 2 green, 6 blue', '2 green' ]
        for(let i = 0; i < group.length; i++){
            // e.g. 3 blue, 4 red
            let sets = group[i].split(', ');

            for(let j = 0; j < sets.length; j++){
                // e.g. 3 blue
                let cubes = sets[j].split(' ');
                let cubeCnt = parseInt(cubes[0]);
                let cubeColor = cubes[1];

                if (cubeCnt > lineMaxes[cubeColor]) lineMaxes[cubeColor] = cubeCnt
            }
        }

        const power = Object.values(lineMaxes).reduce((partialSum, a) => partialSum * a, 1);
        sum += power
    }

    console.log("P2: " + sum);
};


const readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), "utf8").split("\n");

p1();
p2();
