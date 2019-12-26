import types from "./../actions/actionTypes";
import initialState from "./initialState";

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
