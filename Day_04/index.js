const fs = require("fs");
const path = require("path");

const cards = [];

const main = async () => {
    const lines = readFile("input.txt");
    let points = 0;
    let finalCardCnt = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].replace(/Card \d: /, '');
        let numMatchCnt = 0;

        const [winNums, myNums] = line.split(' | ').map(x => {
            return x.split(' ').filter(y => !isNaN(parseInt(y)));
        });

        cards[i] = {cards: [[winNums, myNums]], numOfCards: 1};

        //P1
        myNums.forEach(num => {
            if (winNums.includes(num)) numMatchCnt++;
        });

        if (numMatchCnt > 0) points += Math.pow(2, numMatchCnt-1);
    }

    // P2
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // create duplicates
        for (let j = 1; j <= card.numOfCards; j++) {
            card.cards.push(card.cards[0]);
        }

        for (let j = 0; j < card.numOfCards; j++) {
            let [winNums, myNums] = card.cards[j];
            let numMatchCnt = 0;
    
            myNums.forEach(num => {
                if (winNums.includes(num)) numMatchCnt++;
            });
    
            // count needed duplicates
            for (let k = 1; k <= numMatchCnt; k++) {
                if(i+k < cards.length) cards[i+k].numOfCards++;
            }
        }
    }

    cards.forEach(card => finalCardCnt += card.numOfCards);

    console.log("P1: " + points);
    console.log("P2: " + finalCardCnt);
};

const readFile = (filename) => fs.readFileSync(path.join(__dirname, filename), "utf8").split("\n");

main();
