import types from "./actionTypes";
import { drawCard } from "./deckActions";

export function nextPhase(phase, playerID) {
  return function(dispatch) {
    if (phase === 1) dispatch(drawCard(playerID));

    return dispatch(changePhase(phase, playerID));
  };
}

export function changePhase(phase, id) {
  switch (phase) {
    case 7: {
      const nextPlayer = id === 0 ? 1 : 0;
      return {
        type: types.NEXT_PHASE,
        currentPhase: 1,
        currentPlayer: nextPlayer
      };
    }
    default:
      return {
        type: types.NEXT_PHASE,
        currentPhase: phase + 1
      };
  }
}
