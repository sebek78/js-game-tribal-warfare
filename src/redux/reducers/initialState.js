import shuffledDeck from "./../../game_data/deck";
import { INIT_PEOPLE, INIT_FOOD_UNITS } from "./../../game_data/constants";

let initialState = {
  game: {
    phase: 1,
    currentPlayer: 0,
    gameOver: false,
    winner: null,
    cardLimit: false,
    cardId: null
  },
  players: [
    { name: "A", id: 0, food: INIT_FOOD_UNITS },
    { name: "B", id: 1, food: INIT_FOOD_UNITS }
  ],
  deck: [],
  people: []
};

initialState.deck = shuffledDeck;

export const person = {
  name: "Plemienny",
  type: "person",
  owner: null,
  prisoner: false,
  value: 1,
  meleeWeapon: null,
  rangeWeapon: null
};
let people = [];
let cardId = 1000;
initialState.players.forEach((player, index) => {
  for (let i = 0; i < INIT_PEOPLE; i++) {
    cardId += 1;
    const newPerson = { ...person, owner: index, id: cardId };
    people.push(newPerson);
  }
});
initialState.game.cardId = cardId;

initialState.people = people;

export default initialState;
