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
    dispatch(discardFoodCard(cardID));
    return dispatch(addFood(playerID, cardValue));
  };
}

export function discardFoodCard(cardID) {
  return {
    type: types.DISCARD_FOOD_CARD,
    cardID
  };
}
