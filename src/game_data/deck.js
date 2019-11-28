import deckData from "./deckData";

let newDeck = [];

deckData.forEach(cardData => {
  for (let i = 0; i < cardData.number; i++) {
    let newCard = {};
    newCard.name = cardData.name;
    newCard.type = cardData.type;
    newCard.value = cardData.value;
    newCard.owner = null;
    newDeck.push(newCard);
  }
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}

shuffle(newDeck);

export default newDeck;
