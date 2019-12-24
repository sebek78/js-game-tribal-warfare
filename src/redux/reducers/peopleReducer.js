import types from "./../actions/actionTypes";
import initialState from "./initialState";

export default function peopleReducer(state = initialState.people, action) {
  switch (action.type) {
    case types.ADD_NEW_COMMON_PERSON: {
      let personCopy = { ...action.person };
      personCopy.owner = action.playerID;
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
    default:
      return state.sort(compareStr);
  }
}

// sort people card by strength
const compareStr = (a, b) => b.value - a.value;
