import * as types from "./actionTypes";
import shuffledDeck from "./../../game_data/deck";

export function nextPhase(phase) {
  return {
    type: types.NEXT_PHASE,
    currentPhase: phase
  };
}

export function loadDeckSuccess(initDeck) {
  return {
    type: types.INIT_GAME_SUCCESS,
    initDeck: initDeck
  };
}

export function initGame() {
  return function(dispatch) {
    return shuffledDeck
      .then(initDeck => {
        dispatch(loadDeckSuccess(initDeck));
      })
      .catch(error => {
        throw error;
      });
  };
}
