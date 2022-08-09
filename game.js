// import { cloneDeep } from "lodash";

const suites = ["♣️", "♠️", "♥️", "♦️"];
const numbers = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const jokers = ["Colored Joker", "Black Joker"];

class Deck {
  constructor() {
    this.cards = this.shuffle(this.generateCards());
    this.cardsLeft = 54;
  }

  generateCards() {
    const cards = [];

    suites.forEach((suit) => {
      numbers.forEach((number) => {
        const card = number + suit;
        cards.push(card);
      });
    });
    cards.push(...jokers);
    return cards;
  }

  shuffle(cardArray = this.cards) {
    for (let i = cardArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }
    return cardArray;
  }

  toString() {
    return Array.from(this.cards);
  }

  draw() {
    if (!this.cardsLeft === 0) return "No cards left";
    this.cardsLeft--;
    return this.cards.pop();
  }
}

const NUM_PLAYERS = 6;

class Game {
  constructor() {
    this.gameDeck = new Deck();
    this.playerHands = this.deal(
      Array.from(Array(NUM_PLAYERS), () => new Array())
    );
  }

  deal(handArray = this.playerHands, gameDeck = this.gameDeck) {
    let playerCounter = 0;

    while (gameDeck.cardsLeft) {
      const card = this.gameDeck.draw();
      handArray[playerCounter].push(card);
      playerCounter = (playerCounter + 1) % NUM_PLAYERS;
    }
    return handArray;
  }

  toString() {
    return this.playerHands;
  }
}

const game = new Game();
console.log(game);
