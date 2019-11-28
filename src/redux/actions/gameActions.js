import types from "./actionTypes";
import { drawCard } from "./deckActions";
import { addNewPersons } from "./peopleActions";

export function nextPhase(phase, playerID) {
  return function(dispatch) {
    if (phase === 1) dispatch(drawCard(playerID));
    if (phase === 3) dispatch(addNewPersons(playerID));

    return dispatch(changePhase(phase, playerID));
  };
}

export function changePhase(phase, id) {
  switch (phase) {
    case 3: {
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
