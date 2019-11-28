import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import PropTypes from "prop-types";

class Game extends React.Component {
  state = {
    game: {
      phase: 0,
      currentPlayer: 1
    },
    players: [{ name: "" }, { name: "" }]
  };

  componentDidMount() {
    const { game, players } = this.props;
    this.setState({
      game: game,
      players
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game)
      this.setState({ game: this.props.game });
  }

  renderSwitch = () => {
    switch (this.state.game.phase) {
      case 1:
        return "Losuj kartę";
      default:
        return "Następna faza";
    }
  };

  render() {
    return (
      <div>
        <hr />
        <span>Faza gry {this.state.game.phase}</span>
        {" | "}
        <span>
          Gracz: {this.state.players[this.state.game.currentPlayer].name}
        </span>
        {" | "}
        <button
          onClick={() => {
            this.props.nextPhase(
              this.state.game.phase,
              this.state.game.currentPlayer
            );
          }}
        >
          {this.renderSwitch(this.state.game.phase)}
        </button>
        <hr />
        <div>
          <p>Player: {this.state.players[0].name} </p>
          <p>Hand:</p>
        </div>
        <hr />
        <div>
          <p>Player: {this.state.players[1].name}</p>
          <p>Hand:</p>
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  game: PropTypes.object.isRequired,
  nextPhase: PropTypes.func.isRequired,
  players: PropTypes.array
};

function mapStateToProps(state) {
  return {
    game: state.game,
    deck: state.deck,
    players: state.players
  };
}

const mapDispatchToProps = {
  nextPhase: gameActions.nextPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
