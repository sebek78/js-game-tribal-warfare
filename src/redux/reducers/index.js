import { combineReducers } from "redux";
import game from "./gameReducer";
import players from "./playersReducer";
import people from "./peopleReducer";
import deck from "./deckReducer";

const rootReducer = combineReducers({
  game,
  players,
  people,
  deck
});

export default rootReducer;
