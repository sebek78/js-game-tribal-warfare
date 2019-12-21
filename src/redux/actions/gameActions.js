import types from "./actionTypes";
import { drawCard } from "./deckActions";
import { addNewPersons } from "./peopleActions";
import { consumeFood } from "./playersActions";

export function nextPhase(phase, playerID) {
  return function(dispatch, getState) {
    if (phase === 1) dispatch(drawCard(playerID));
    if (phase === 4) dispatch(addNewPersons(playerID));
    if (phase === 5) {
      const people = getState().people;
      const peopleNum = people.reduce((prevValue, person) => {
        if (person.owner === playerID) return (prevValue += 1);
        else return prevValue;
      }, 0);
      dispatch(consumeFood(playerID, peopleNum));
    }
    if (phase === 8) {
      const people = getState().people;
      const names = getState().players.map(player => player.name);
      const player1pts = people.reduce((prevValue, person) => {
        if (person.owner === 0) return (prevValue += 1);
        else return prevValue;
      }, 0);
      const player2pts = people.reduce((prevValue, person) => {
        if (person.owner === 1) return (prevValue += 1);
        else return prevValue;
      }, 0);
      const gameOver = checkWinConditions(player1pts, player2pts, names);
      if (gameOver !== null) {
        dispatch(setGameOver(gameOver));
      }
    }
    return dispatch(changePhase(phase, playerID));
  };
}

function changePhase(phase, id) {
  switch (phase) {
    case 8: {
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

function checkWinConditions(p1, p2, names) {
  let winner = "";
  if (p1 >= 30 || p2 <= 0) {
    winner = names[0];
  } else if (p2 >= 30 || p1 <= 0) {
    winner = names[1];
  } else {
    return null;
  }
  return {
    gameOver: true,
    winner
  };
}

function setGameOver({ gameOver, winner }) {
  console.log(gameOver, winner);
  return {
    type: types.CHECK_END_GAME_CONDITIONS,
    gameOver,
    winner
  };
}
