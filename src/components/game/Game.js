import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import PropTypes from "prop-types";

function Game(props) {
  const [game, nextPhase] = useState({ phase: -1 });

  useEffect(() => {
    nextPhase(props.game.phase);
  }, [props]);

  return (
    <div>
      <span>Faza gry {props.game.phase}</span>
      <button
        onClick={() => {
          props.nextPhase(game);
        }}
      >
        Następna faza
      </button>
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  nextPhase: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    game: state.game
  };
}

const mapDispatchToProps = {
  nextPhase: gameActions.nextPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
