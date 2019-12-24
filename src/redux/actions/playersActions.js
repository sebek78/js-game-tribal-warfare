import types from "./actionTypes";

export function addFood(playerID, value) {
  return {
    type: types.ADD_FOOD,
    playerID,
    value
  };
}
export function consumeFood(playerID, peopleNum) {
  return {
    type: types.CONSUME_FOOD,
    playerID,
    peopleNum
  };
}
