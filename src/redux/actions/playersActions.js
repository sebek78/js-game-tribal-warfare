import types from "./actionTypes";

export function addFood(playerID, value) {
  return {
    type: types.ADD_FOOD,
    playerID,
    value
  };
}
