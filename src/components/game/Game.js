import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import PropTypes from "prop-types";

function Game(props) {
  const [game, nextPhase] = useState({ phase: -1 });

  useEffect(() => {
    console.log(props.game);
    if (props.game.phase === 0 && props.game.deck.length === 0) {
      props.initGame();
    }
    nextPhase(props.game.phase);
  }, [props.game]);

  const renderSwitch = phase => {
    switch (props.game.phase) {
      case 0:
        return "Start gry";
      case 1:
        return "Losuj kartę";
      default:
        return "Następna faza";
    }
  };

  return (
    <div>
      <hr />
      <span>Faza gry {props.game.phase}</span>
      <button
        onClick={() => {
          props.nextPhase(game);
        }}
      >
        {renderSwitch(props.game.phase)}
      </button>
      <hr />
      <div>
        <p>Player: {props.game.players[0].name}</p>
        <p>Hand:</p>
        <ul>
          {props.game.players[0].hand.map((card, i) => {
            return <li key={i}>{card.toString()}</li>;
          })}
        </ul>
      </div>
      <hr />
      <div>
        <p>Player: {props.game.players[1].name}</p>
        <p>Hand:</p>
        <ul>
          {props.game.players[1].hand.map((card, i) => {
            return <li key={i}>{card.toString()}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  nextPhase: PropTypes.func.isRequired,
  initGame: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    game: state.game
  };
}

const mapDispatchToProps = {
  nextPhase: gameActions.nextPhase,
  initGame: gameActions.initGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
