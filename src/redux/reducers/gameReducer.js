import * as types from "./../actions/actionTypes";
import initialState from "./initialState";

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case types.NEXT_PHASE:
      if (action.currentPhase === 7) {
        return { ...state, phase: 1 };
      } else {
        return {
          ...state,
          phase: action.currentPhase + 1
        };
      }
    default:
      return state;
  }
}
