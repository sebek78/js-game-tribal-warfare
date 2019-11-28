import types from "./actionTypes";

export function nextPhase(phase, id) {
  switch (phase) {
    case 7: {
      const nextPlayer = id === 0 ? 1 : 0;
      return {
        type: types.NEXT_PHASE,
        currentPhase: 1,
        currentPlayer: nextPlayer
      };
    }
    default:
      return {
        type: types.NEXT_PHASE,
        currentPhase: phase + 1
      };
  }
}
