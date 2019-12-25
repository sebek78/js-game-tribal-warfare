import types from "./../actions/actionTypes";
import initialState from "./initialState";

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case types.NEXT_PHASE:
      if (action.currentPlayer === undefined) {
        return {
          ...state,
          phase: action.currentPhase
        };
      } else {
        return {
          ...state,
          phase: action.currentPhase,
          currentPlayer: action.currentPlayer
        };
      }
    case types.CHECK_END_GAME_CONDITIONS:
      return {
        ...state,
        gameOver: action.gameOver,
        winner: action.winner
      };
    case types.SET_CARD_LIMIT_FLAG:
      return {
        ...state,
        cardLimit: action.value
      };
    case types.INCREASE_CARD_ID: {
      const newId = state.cardId + 1;
      return {
        ...state,
        cardId: newId
      };
    }
    default:
      return state;
  }
}
