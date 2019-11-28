import types from "./actionTypes";

export function drawCard(id) {
  return {
    type: types.DRAW_CARD,
    id
  };
}
