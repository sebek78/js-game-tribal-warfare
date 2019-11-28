import types from "./actionTypes";
import { addFood } from "./playersActions";

export function drawCard(id) {
  return {
    type: types.DRAW_CARD,
    id
  };
}

export function gainFood(cardID, cardValue, playerID) {
  return function(dispatch) {
    dispatch(discardCard(cardID));
    return dispatch(addFood(playerID, cardValue));
  };
}

export function discardCard(cardID) {
  return {
    type: types.DISCARD_CARD,
    cardID
  };
}
