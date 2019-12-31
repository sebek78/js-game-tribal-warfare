import types from "./../actions/actionTypes";
import initialState from "./initialState";
import { shuffle } from "./../../game_data/deck";
import { DISCARDED_CARD, ATTACHED_CARD } from "./../../game_data/constants";

export default function deckReducer(state = initialState.deck, action) {
  switch (action.type) {
    case types.DRAW_CARD: {
      let stateCopy;
      let cardsLeft = state.reduce((prevValue, card) => {
        if (card.owner === null) return (prevValue += 1);
        else return prevValue;
      }, 0);
      if (cardsLeft === 0) {
        let discardedCards = state.filter(
          card => card.owner === DISCARDED_CARD
        );
        let notDiscardedCards = state.filter(
          card => card.owner !== DISCARDED_CARD
        );
        let resetOwnerCards = discardedCards.map(card => {
          let cardCopy = { ...card };
          cardCopy.owner = null;
          return cardCopy;
        });
        let shuffledDeck = shuffle(resetOwnerCards);
        stateCopy = notDiscardedCards.concat(shuffledDeck);
      } else {
        stateCopy = [...state];
      }
      const cardIndex = stateCopy.findIndex(card => card.owner === null);
      let drawCard = { ...stateCopy[cardIndex] };
      drawCard.owner = action.id;
      return stateCopy.map((card, i) => (cardIndex === i ? drawCard : card));
    }
    case types.DISCARD_CARD: {
      const cardToDiscard = state.filter(card => card.id === action.cardID);
      let cardCopy = { ...cardToDiscard[0] };
      cardCopy.owner = DISCARDED_CARD;
      return state.map(card => (card.id === action.cardID ? cardCopy : card));
    }
    case types.SET_CARD_ATTACHED: {
      const cardIndex = state.findIndex(card => card.id === action.cardId);
      let cardCopy = { ...state[cardIndex] };
      cardCopy.owner = ATTACHED_CARD;
      return state.map(card => (card.id === action.cardId ? cardCopy : card));
    }
    default:
      return state;
  }
}
