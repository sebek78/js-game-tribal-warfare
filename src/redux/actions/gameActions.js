export function nextPhase(phase) {
  return {
    type: "NEXT_PHASE",
    currentPhase: phase
  };
}
