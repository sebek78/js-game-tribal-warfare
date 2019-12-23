import shuffledDeck from "./../../game_data/deck";
import { INIT_PEOPLE, INIT_FOOD_UNITS } from "./../../game_data/constants";

let initialState = {
  game: {
    phase: 1,
    currentPlayer: 0,
    gameOver: false,
    winner: null,
    cardLimit: false
  },
  players: [
    { name: "A", food: INIT_FOOD_UNITS },
    { name: "B", food: INIT_FOOD_UNITS }
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
  rangedWeapon: null
};
let people = [];
initialState.players.forEach((player, id) => {
  for (let i = 0; i < INIT_PEOPLE; i++) {
    const newPerson = { ...person, owner: id };
    people.push(newPerson);
  }
});

initialState.people = people;

export default initialState;
