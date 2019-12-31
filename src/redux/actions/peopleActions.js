import types from "./actionTypes";
import { person } from "../reducers/initialState";
import { discardCard, setCardAttached } from "./deckActions";
import { increaseCardId } from "./gameActions";
import battle from "./../../game_data/battle";

export function addNewPersons(playerID) {
  return function(dispatch, getState) {
    dispatch(increaseCardId());
    const newPersonId = getState().game.cardId;
    dispatch(newCommonPerson(playerID, newPersonId));
    const playerPersonsCards = getState().deck.filter(
      card => card.owner === playerID && card.type === "person"
    );
    if (playerPersonsCards.length > 0) {
      playerPersonsCards.forEach(card => {
        dispatch(setCardAttached(card.id));
      });
      return dispatch(playPersonCard(playerID, playerPersonsCards));
    } else {
      // console.log("Phase 3: no card to move");
      return;
    }
  };
}

export function resolveBattle(cardId, currentPlayer) {
  return function(dispatch, getState) {
    dispatch(discardCard(cardId));
    const people = getState().people;
    const killedIds = battle(currentPlayer, people);
    killedIds.forEach(id => {
      const killedPerson = people.filter(person => person.id === id)[0];
      if (killedPerson.meleeWeapon !== null) {
        dispatch(discardCard(killedPerson.meleeWeapon.id));
      }
      if (killedPerson.rangeWeapon !== null) {
        dispatch(discardCard(killedPerson.rangeWeapon.id));
      }
      if (killedPerson.id < 1000) {
        // this person is a card from a deck
        dispatch(discardCard(killedPerson.id));
      }
    });
    return dispatch(updateAfterBattle(killedIds));
  };
}

function updateAfterBattle(killedIds) {
  return {
    type: types.RESOLVE_BATTLE,
    killedIds
  };
}

function newCommonPerson(playerID, newId) {
  return {
    type: types.ADD_NEW_COMMON_PERSON,
    playerID,
    person,
    newId
  };
}

function playPersonCard(playerID, newPersonCards) {
  return {
    type: types.ADD_NEW_PERSON,
    playerID,
    newPersonCards
  };
}
