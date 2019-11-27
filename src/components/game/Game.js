import React, { useState, useEffect } from "react";

function Game() {
  const [game, nextPhase] = useState({ phase: 0 });

  useEffect(() => {
    console.log("game");
  }, []);

  return (
    <div>
      <span>Faza gry {game.phase}</span>
      <button onClick={() => nextPhase({ ...game, phase: game.phase + 1 })}>
        Następna faza
      </button>
    </div>
  );
}

export default Game;
