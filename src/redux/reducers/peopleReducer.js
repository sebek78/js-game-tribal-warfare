import types from "./../actions/actionTypes";
import initialState from "./initialState";
import { KILLED_IN_BATTLE } from "../../game_data/constants";

export default function peopleReducer(state = initialState.people, action) {
  switch (action.type) {
    case types.ADD_NEW_COMMON_PERSON: {
      let personCopy = { ...action.person };
      personCopy.owner = action.playerID;
      personCopy.id = action.newId;
      return [...state, { ...personCopy }];
    }
    case types.ADD_NEW_PERSON: {
      let cardsToAdd = [];
      action.newPersonCards.forEach(card => {
        let cardCopy = { ...card };
        cardsToAdd.push(cardCopy);
      });
      let newState = state.concat(cardsToAdd);
      newState.sort(compareStr);
      return newState;
    }
    case types.ATTACH_WEAPON:
      return state
        .map(card => (card.id === action.card.id ? action.card : card))
        .sort(compareStr);
    case types.RESOLVE_BATTLE: {
      const stateCopy = state.map(person => {
        return { ...person };
      });
      action.killedIds.forEach(id => {
        stateCopy.map(person => {
          if (person.id === id) person.owner = KILLED_IN_BATTLE;
        });
      });
      return stateCopy.filter(person => person.owner !== KILLED_IN_BATTLE);
    }
    default:
      return state.sort(compareStr);
  }
}

// sort people card by strength, includes melee weapon strength and range weapon strength
const compareStr = (a, b) => {
  let c = { ...a };
  let d = { ...b };
  if (a.meleeWeapon !== null) c.value += a.meleeWeapon.value;
  if (b.meleeWeapon !== null) d.value += b.meleeWeapon.value;
  if (a.rangeWeapon !== null) c.value += a.rangeWeapon.value;
  if (b.rangeWeapon !== null) d.value += b.rangeWeapon.value;
  return d.value - c.value;
};
