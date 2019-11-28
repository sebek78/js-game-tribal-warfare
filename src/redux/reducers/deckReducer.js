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
    case types.DISCARD_FOOD_CARD: {
      const cardToDiscard = { ...state[action.cardID] };
      return state.map(card =>
        card.id === action.cardID ? cardToDiscard : card
      );
    }
    default:
      return state;
  }
}
