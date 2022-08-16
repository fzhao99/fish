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
const jokers = ["🤡⬛", "🤡🟥"];

const NUM_PLAYERS = 6;
const DECK_SIZE = 54;

class Deck {
  constructor() {
    this.cards = this.shuffle(this.generateCards());
    this.cardsLeft = DECK_SIZE;
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
const stage = new createjs.Stage("game-canvas");
createjs.Touch.enable(stage);

const BEGIN_Y = 50;
const BEGIN_X = 50;
const CARD_WIDTH = 105;
const CARD_HEIGHT = 150;
const X_CARD_GUTTER = 50;
const Y_CARD_GUTTER = 50;
const CARD_TEXT_HEIGHT = 30;

game.playerHands.forEach((hand, handIdx) => {
  hand.forEach((card, cardIdx) => {
    const cardStartX = BEGIN_X + (X_CARD_GUTTER + CARD_WIDTH) * cardIdx;
    const cardStartY = BEGIN_Y + (Y_CARD_GUTTER + CARD_HEIGHT) * handIdx;

    const cardText = new createjs.Text(
      card,
      `${CARD_TEXT_HEIGHT}px monospace`,
      "black"
    );

    const cardRect = new createjs.Shape();
    cardRect.graphics
      .beginStroke("black")
      .drawRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

    const cardContainer = new createjs.Container();
    cardContainer.x = cardStartX;
    cardContainer.y = cardStartY;
    cardContainer.addChild(cardRect, cardText);
    stage.addChild(cardContainer);

    cardContainer.on("pressmove", function (evt) {
      console.log(evt);
      evt.currentTarget.x = evt.stageX;
      evt.currentTarget.y = evt.stageY;
      stage.update();
    });

    stage.update();
  });
});
