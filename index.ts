const CARD = {
    EGGXECUTOREX: "EGGXECUTOREX",
    EGGXECUTOR: "EGGXECUTOR",
    EGGXECUTE: "EGGXECUTE",
    POKEBALL: "POKEBALL",
    PROFESSOR_RESEARCH: "PROFESSOR_RESEARCH",
    POKEMON_CONNECTION: "POKEMON_CONNECTION",
    IONO: "IONO",
    DUMMY_CARD: "DUMMY_CARD",
};

const createDeck = () => {
    const deck = [];

    deck.push(CARD.EGGXECUTOREX);
    deck.push(CARD.EGGXECUTOREX);
    deck.push(CARD.EGGXECUTE);
    deck.push(CARD.POKEBALL);
    deck.push(CARD.POKEBALL);
    deck.push(CARD.PROFESSOR_RESEARCH);
    deck.push(CARD.PROFESSOR_RESEARCH);
    deck.push(CARD.POKEMON_CONNECTION);
    deck.push(CARD.POKEMON_CONNECTION);
    deck.push(CARD.IONO);
    deck.push(CARD.IONO);

    while (deck.length < 19) {
        deck.push(CARD.DUMMY_CARD);
    }

    return deck;
};

const drawCard = (deck: string[], hand: string[]) => {
    const spliceIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(spliceIndex, 1)[0];
    hand.push(card);
};

const hasPlayableCard = (hand: string[], playedTrainerCard: boolean) => {
    if (!hand.includes(CARD.EGGXECUTE) && hand.includes(CARD.POKEBALL)) {
        return true;
    }
    if (!playedTrainerCard && hand.includes(CARD.PROFESSOR_RESEARCH)) {
        return true;
    }
    if (!playedTrainerCard && hand.includes(CARD.IONO)) {
        return true;
    }
    if (
        (hand.includes(CARD.EGGXECUTE) || hand.includes(CARD.EGGXECUTOR)) &&
        hand.includes(CARD.POKEMON_CONNECTION)
    ) {
        return true;
    }
    return false;
};

const showDebugLogs = false;

const doTurn = (hand: string[], deck: string[]) => {
    let playedTrainerCard = false;

    while (
        hand.length > 0 &&
        !hand.includes(CARD.EGGXECUTOREX) &&
        hasPlayableCard(hand, playedTrainerCard)
    ) {
        if (showDebugLogs) {
            console.log(
                `Has Cards to play: ${hand}, ${
                    !hand.includes(CARD.EGGXECUTE) &&
                    hand.includes(CARD.POKEBALL)
                }, ${hand.includes(CARD.PROFESSOR_RESEARCH)}, ${
                    (hand.includes(CARD.EGGXECUTE) ||
                        hand.includes(CARD.EGGXECUTOR)) &&
                    hand.includes(CARD.POKEMON_CONNECTION)
                }`
            );
        }
        if (!hand.includes(CARD.EGGXECUTE) && hand.includes(CARD.POKEBALL)) {
            hand.splice(hand.indexOf(CARD.POKEBALL), 1);
            if (deck.includes(CARD.EGGXECUTE)) {
                hand.push(CARD.EGGXECUTE);
                deck.splice(deck.indexOf(CARD.EGGXECUTE), 1);
            }
            if (showDebugLogs) {
                console.log(`Played Pokeball, ${hand}`);
            }
            continue;
        }

        if (hand.includes(CARD.PROFESSOR_RESEARCH) && !playedTrainerCard) {
            hand.splice(hand.indexOf(CARD.PROFESSOR_RESEARCH), 1);
            playedTrainerCard = true;
            drawCard(deck, hand);
            drawCard(deck, hand);
            if (showDebugLogs) {
                console.log(`Played Professor Research, ${hand}`);
            }
            continue;
        }

        if (
            (hand.includes(CARD.EGGXECUTE) || hand.includes(CARD.EGGXECUTOR)) &&
            hand.includes(CARD.POKEMON_CONNECTION)
        ) {
            const hasEggxecute = hand.includes(CARD.EGGXECUTE);

            hand.splice(hand.indexOf(CARD.POKEMON_CONNECTION), 1);
            const possibleCardsFromDeck = deck.filter(
                (card) =>
                    card == CARD.EGGXECUTOREX ||
                    card == CARD.EGGXECUTOR ||
                    card == CARD.EGGXECUTE
            );

            const card =
                possibleCardsFromDeck[
                    Math.floor(Math.random() * possibleCardsFromDeck.length)
                ];
            hand.push(card);
            deck.splice(deck.indexOf(card), 1);

            if (hasEggxecute) {
                hand.splice(hand.indexOf(CARD.EGGXECUTE), 1);
                deck.push(CARD.EGGXECUTE);
            } else {
                hand.splice(hand.indexOf(CARD.EGGXECUTOR), 1);
                deck.push(CARD.EGGXECUTOR);
            }

            if (showDebugLogs) {
                console.log(`Played Pokemon Connection, ${hand}`);
            }

            continue;
        }

        if (hand.includes(CARD.IONO) && !playedTrainerCard) {
            playedTrainerCard = true;
            hand.splice(hand.indexOf(CARD.IONO), 1);
            const handSize = hand.length;
            deck = deck.concat(hand);
            hand = [];
            for (let i = 0; i < handSize; i++) {
                drawCard(deck, hand);
            }

            if (showDebugLogs) {
                console.log(`Played Iono, ${hand}`);
            }
            continue;
        }
    }
};

const runSimulation = (simulationNumber: number) => {
    const deck = createDeck();
    const hand: string[] = [];

    // Randomly pop a card from the deck
    drawCard(deck, hand);
    drawCard(deck, hand);
    drawCard(deck, hand);
    drawCard(deck, hand);

    // Turn one
    if (showDebugLogs) {
        console.log(`Simulation ${simulationNumber}: Start Turn 1`);
    }
    drawCard(deck, hand);
    if (hand.includes(CARD.EGGXECUTOREX)) {
        return true;
    }
    doTurn(hand, deck);

    // Turn two
    if (showDebugLogs) {
        console.log(`Simulation ${simulationNumber}: Start Turn 2`);
    }
    drawCard(deck, hand);
    if (hand.includes(CARD.EGGXECUTOREX)) {
        return true;
    }
    doTurn(hand, deck);
    if (hand.includes(CARD.EGGXECUTOREX)) {
        return true;
    }

    // Turn three
    if (showDebugLogs) {
        console.log(`Simulation ${simulationNumber}: Start Turn 4`);
    }
    drawCard(deck, hand);
    if (hand.includes(CARD.EGGXECUTOREX)) {
        return true;
    }
    doTurn(hand, deck);
    if (hand.includes(CARD.EGGXECUTOREX)) {
        return true;
    }

    // Turn four
    if (showDebugLogs) {
        console.log(`Simulation ${simulationNumber}: Start Turn 4`);
    }
    drawCard(deck, hand);
    if (hand.includes(CARD.EGGXECUTOREX)) {
        return true;
    }
    doTurn(hand, deck);
    if (hand.includes(CARD.EGGXECUTOREX)) {
        return true;
    }

    return false;
};

let wins = 0;
let losses = 0;

console.time("Simulation");

for (let i = 1; i <= 1000000; i++) {
    const result = runSimulation(i);
    if (result) {
        // console.log(`Simulation ${i}: won`);
        wins++;
    } else {
        // console.log(`Simulation ${i}: lost`);
        losses++;
    }
}

console.timeEnd("Simulation");

console.log(`Wins: ${wins}`);
console.log(`Losses: ${losses}`);
console.log(`Win rate: ${wins / (wins + losses)}`);
