import types from "./../actions/actionTypes";
import initialState from "./initialState";

export default function deckReducer(state = initialState.deck, action) {
  switch (action.type) {
    case types.DRAW_CARD: {
      const cardIndex = state.findIndex(card => card.owner === null);
      let drawCard = { ...state[cardIndex] };
      drawCard.owner = action.id;
      return state.map((card, i) => (cardIndex === i ? drawCard : card));
    }
    case types.DISCARD_CARD: {
      const cardToDiscard = state.filter(card => card.id === action.cardID);
      let cardCopy = { ...cardToDiscard[0] };
      cardCopy.owner = -1;
      return state.map(card => (card.id === action.cardID ? cardCopy : card));
    }
    default:
      return state;
  }
}
