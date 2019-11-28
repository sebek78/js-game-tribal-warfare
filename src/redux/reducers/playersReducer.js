import types from "./../actions/actionTypes";
import initialState from "./initialState";

export default function playersReducer(state = initialState.players, action) {
  switch (action.type) {
    case types.GET_PLAYER_NAME:
      return state[action.id].name;

    default:
      return state;
  }
}
