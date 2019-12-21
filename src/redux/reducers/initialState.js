import shuffledDeck from "./../../game_data/deck";

let initialState = {
  game: {
    phase: 1,
    currentPlayer: 0
  },
  players: [
    { name: "A", food: 2 },
    { name: "B", food: 2 }
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
  for (let i = 0; i < 10; i++) {
    const newPerson = { ...person, owner: id };
    people.push(newPerson);
  }
});

initialState.people = people;

export default initialState;
