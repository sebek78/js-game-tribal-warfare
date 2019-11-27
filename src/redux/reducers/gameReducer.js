export default function gameReducer(state = {}, action) {
  switch (action.type) {
    case "NEXT_PHASE":
      return { ...state, phase: action.currentPhase + 1 };
    default:
      return state;
  }
}
