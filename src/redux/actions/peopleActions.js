import types from "./actionTypes";
import { person } from "../reducers/initialState";
import { discardCard } from "./deckActions";

export function addNewPersons(playerID) {
  return function(dispatch, getState) {
    dispatch(newCommonPerson(playerID));
    const playerPersonsCards = getState().deck.filter(
      card => card.owner === playerID && card.type === "person"
    );
    if (playerPersonsCards.length > 0) {
      playerPersonsCards.forEach(card => {
        dispatch(discardCard(card.id));
      });
      return dispatch(playPersonCard(playerID, playerPersonsCards));
    } else {
      console.log("Phase 3: no card to move");
      return;
    }
  };
}

function newCommonPerson(playerID) {
  return {
    type: types.ADD_NEW_COMMON_PERSON,
    playerID,
    person
  };
}

function playPersonCard(playerID, newPersonCards) {
  return {
    type: types.ADD_NEW_PERSON,
    playerID,
    newPersonCards
  };
}
