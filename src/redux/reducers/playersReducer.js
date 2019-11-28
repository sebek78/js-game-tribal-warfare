import types from "./../actions/actionTypes";
import initialState from "./initialState";

export default function playersReducer(state = initialState.players, action) {
  switch (action.type) {
    case types.ADD_FOOD: {
        let playerCopy = {...state[action.playerID]};
        playerCopy.food += action.value;
        return state.map((player,i) =>
          i === action.playerID ? playerCopy : player
        );
    }
    default:
      return state;
  }
}
