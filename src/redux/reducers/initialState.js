import shuffledDeck from "./../../game_data/deck";

let initialState = {
  game: {
    phase: 1,
    currentPlayer: 0
  },
  players: [
    { name: "A", hand: [] },
    { name: "B", hand: [] }
  ]
};

initialState.deck = shuffledDeck;

export default initialState;
