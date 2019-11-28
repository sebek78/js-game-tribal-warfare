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

    default:
      return state;
  }
}
