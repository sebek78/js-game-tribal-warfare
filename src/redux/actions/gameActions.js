import types from "./actionTypes";
import { drawCard } from "./deckActions";
import { addNewPersons } from "./peopleActions";
import { consumeFood } from "./playersActions";

export function nextPhase(phase, playerID) {
  return function(dispatch, getState) {
    if (phase === 1) dispatch(drawCard(playerID));
    if (phase === 4) dispatch(addNewPersons(playerID));
    if (phase === 5) {
      const people = getState().people;
      const peopleNum = people.reduce((prevValue, person) => {
        if (person.owner === playerID) return (prevValue += 1);
        else return prevValue;
      }, 0);
      dispatch(consumeFood(playerID, peopleNum));
    }

    return dispatch(changePhase(phase, playerID));
  };
}

export function changePhase(phase, id) {
  switch (phase) {
    case 5: {
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
