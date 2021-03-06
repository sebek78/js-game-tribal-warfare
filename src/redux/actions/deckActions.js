import types from "./actionTypes";
import { addFood } from "./playersActions";
import { nextPhase, setCardLimitFlag, changePhase } from "./gameActions";
import { EXTRA_CARD_LIMIT, CARD_LIMIT } from "./../../game_data/constants";

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

export function gainFood(cardID, cardValue, phase, playerID) {
  return function(dispatch) {
    dispatch(discardCard(cardID));
    dispatch(addFood(playerID, cardValue));
    return dispatch(nextPhase(phase, playerID));
  };
}

export function discardCard(cardID) {
  return function(dispatch, getState) {
    const phase = getState().game.phase;
    const limit = getState().game.cardLimit;
    if (phase === 1 && limit) {
      dispatch(discardOneCard(cardID));
      const currentPlayer = getState().game.currentPlayer;
      const cardsInHand = getState().deck.reduce((prevValue, card) => {
        if (card.owner === currentPlayer) return (prevValue += 1);
        else return prevValue;
      }, 0);
      if (cardsInHand <= CARD_LIMIT) {
        dispatch(setCardLimitFlag(false));
        dispatch(changePhase(phase, currentPlayer));
      }
    } else {
      dispatch(discardOneCard(cardID));
    }
  };
}

function discardOneCard(cardID) {
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
