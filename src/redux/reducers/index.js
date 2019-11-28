import { combineReducers } from "redux";
import game from "./gameReducer";
import players from "./playersReducer";

const rootReducer = combineReducers({
  game,
  players
});

export default rootReducer;
