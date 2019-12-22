import types from "./actionTypes";
import { addFood } from "./playersActions";

const EXTRA_CARD_LIMIT = 15; // a player with 15 or more people draw an extra card

export function drawCard(playerID) {
  return function(dispatch, getState) {
    let peopleNum = getState().people.reduce((prevValue, person) => {
      if (person.owner === playerID) return (prevValue += 1);
      else return prevValue;
    }, 0);
    if (peopleNum < EXTRA_CARD_LIMIT) {
      return dispatch(drawOneCard(playerID));
    } else {
      dispatch(drawOneCard(playerID));
      return dispatch(drawOneCard(playerID));
    }
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

function drawOneCard(playerID) {
  return {
    type: types.DRAW_CARD,
    id: playerID
  };
}
