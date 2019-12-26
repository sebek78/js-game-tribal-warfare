import types from "./actionTypes";
import { drawCard } from "./deckActions";
import { addNewPersons } from "./peopleActions";
import { consumeFood } from "./playersActions";
import { CARD_LIMIT } from "./../../game_data/constants";

export function nextPhase(phase, playerID) {
  return function(dispatch, getState) {
    switch (phase) {
      case 1:
        {
          let cardsInHand = getState().deck.reduce((prevValue, card) => {
            if (card.owner === playerID) return (prevValue += 1);
            else return prevValue;
          }, 0);
          if (cardsInHand <= CARD_LIMIT) {
            dispatch(drawCard(playerID));
          } else {
            dispatch(setCardLimitFlag(true));
          }
          cardsInHand = getState().deck.reduce((prevValue, card) => {
            if (card.owner === playerID) return (prevValue += 1);
            else return prevValue;
          }, 0);
          if (cardsInHand <= CARD_LIMIT) {
            dispatch(changePhase(phase, playerID));
          } else {
            dispatch(setCardLimitFlag(true));
          }
        }
        break;
      case 2: {
        return dispatch(changePhase(phase, playerID));
      }
      case 4:
        dispatch(addNewPersons(playerID));
        return dispatch(changePhase(phase, playerID));
      case 5:
        {
          const people = getState().people;
          const peopleNum = people.reduce((prevValue, person) => {
            if (person.owner === playerID) return (prevValue += 1);
            else return prevValue;
          }, 0);
          dispatch(consumeFood(playerID, peopleNum));
        }
        return dispatch(changePhase(phase, playerID));
      case 8: {
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
      }
      default:
        return dispatch(changePhase(phase, playerID));
    }
  };
}

export function setCardLimitFlag(bool) {
  return {
    type: types.SET_CARD_LIMIT_FLAG,
    value: bool
  };
}

export function changePhase(phase, id) {
  switch (phase) {
    case 8: {
      const nextPlayer = id === 0 ? 1 : 0;
      return {
        type: types.NEXT_PHASE,
        currentPhase: 1,
        currentPlayer: nextPlayer
      };
    }
    // case 3 event phase
    case 2: {
      return {
        type: types.NEXT_PHASE,
        currentPhase: phase + 2
      };
    }

    default:
      return {
        type: types.NEXT_PHASE,
        currentPhase: phase + 1
      };
  }
}

export function increaseCardId() {
  return {
    type: types.INCREASE_CARD_ID
  };
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
