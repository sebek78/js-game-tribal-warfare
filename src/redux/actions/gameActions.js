import * as types from "./actionTypes";

export function nextPhase(phase) {
  return {
    type: types.NEXT_PHASE,
    currentPhase: phase
  };
}
