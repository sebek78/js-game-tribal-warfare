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

const person = {
  owner: "",
  prisoner: false,
  strength: 1,
  meleeWeapon: null,
  rangedWeapon: null
};
let people = [];
initialState.players.forEach(player => {
  for (let i = 0; i < 10; i++) {
    const newPerson = { ...person, owner: player.name };
    people.push(newPerson);
  }
});

initialState.people = people;

console.log(initialState);

export default initialState;
