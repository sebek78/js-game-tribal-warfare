import { combineReducers } from "redux";
import game from "./gameReducer";
import players from "./playersReducer";
import people from "./peopleReducer";

const rootReducer = combineReducers({
  game,
  players,
  people
});

export default rootReducer;
