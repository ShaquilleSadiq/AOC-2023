const fs = require("fs");
const { setDefaultAutoSelectFamily } = require("net");
const path = require("path");

const map = {};

const main = async () => {
    const lines = readFile("input.txt");
    let currMapKey;
    let seeds;
    let seedPairs;

    for (let line of lines) {
        if (line.includes('seeds')) {
            // for p1
            seeds = line.replace('seeds: ', '').split(' ').map(x => parseInt(x));

            // for p1
            seedPairs = seeds.reduce((res, val, i, arr) => {
                if (i % 2 === 0) res.push(arr.slice(i, i + 2));
                return res;
            }, []);
        }
        
        else if (line.includes(':')) {
            currMapKey = line.split(' ')[0];
            map[currMapKey] = [];
        } else if (line === '') continue;
        else {
            const currMap = map[currMapKey];
            const [destStart, sourceStart, range] = line.split(' ').map(x => parseInt(x));
            
            currMap.push([destStart, sourceStart, range]);
        }
    }

    let locations = [];
    let nextIdx = 0;

    // P1
    seeds.forEach((seed) => {
        nextIdx = seed;
        
        Object.values(map).forEach((lineItem, idx) => {
            const arr = [];
            for (let i = 0; i < lineItem.length; i++) {
                const [destStart, sourceStart, range] = lineItem[i];
                if (nextIdx >= sourceStart && nextIdx < (sourceStart+range)) {
                    arr.push(nextIdx);
                    nextIdx = destStart + (nextIdx - sourceStart);
                    break;
                }
            }
            if (idx === Object.values(map).length-1) locations.push(nextIdx);
        });
    });
    console.log("P1: " + Math.min(...locations));

    // P2
    let minLocation = Infinity;
    nextIdx = 0;
    seedPairs.forEach(([seedStart, seedRange]) => { 
        console.log(seedPairs.length); 
        for (let j = 0; j < seedRange; j++) {
            nextIdx = seedStart+j;
            const mapVals = Object.values(map);

            for (let idx = 0; idx < mapVals.length; idx++) {
                const lineItem = mapVals[idx];
                const arr = [];
                for (let i = 0; i < lineItem.length; i++) {
                    const [destStart, sourceStart, range] = lineItem[i];
                    if (nextIdx >= sourceStart && nextIdx < (sourceStart+range)) {
                        arr.push(nextIdx);
                        nextIdx = destStart + (nextIdx - sourceStart);
                        break;
                    }
                }
                
                if (idx === mapVals.length-1 && nextIdx < minLocation) minLocation = nextIdx;
            }
        }
    });

    console.log("P2: " + minLocation);
};

const readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), "utf8").split("\n");

main();
