import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import * as deckActions from "../../redux/actions/deckActions";
import PropTypes from "prop-types";

class Game extends React.Component {
  state = {
    game: {
      phase: 0,
      currentPlayer: 1
    },
    players: [{ name: "" }, { name: "" }],
    people: [],
    deck: []
  };

  componentDidMount() {
    const { game, players, people, deck } = this.props;
    this.setState({
      game: game,
      players,
      people,
      deck
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game) {
      console.log("update game");
      this.setState({ game: this.props.game });
    }
    if (this.props.deck !== prevProps.deck) {
      console.log("update deck");
      this.setState({ deck: this.props.deck });
    }
    if (this.props.players !== prevProps.players) {
      console.log("update players");
      this.setState({ players: this.props.players });
    }
  }

  renderSwitch = () => {
    switch (this.state.game.phase) {
      case 1:
        return "Losuj kartę";
      case 2:
        return "Polowanie i zbieranie";
      default:
        return "Następna faza";
    }
  };

  render() {
    console.log("render");
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
        {this.state.players.map((player, j) => {
          return (
            <div key={j} className="playerView">
              <p>
                Gracz: {this.state.players[j].name}
                <span style={{ marginLeft: 10 }}>
                  Żywność: {this.state.players[j].food}
                </span>
              </p>
              <p>Ludzie:</p>
              <ul>
                {this.state.people.map((person, i) => {
                  if (person.owner === this.state.players[j].name) {
                    return <li key={i}>Person</li>;
                  }
                })}
              </ul>
              <p>Karty</p>
              <ul>
                {this.state.deck.map((card, k) => {
                  if (card.owner === j) {
                    return (
                      <li key={k}>
                        {`${card.name.toString()} (żywność: +${card.value})`}
                        {this.state.game.phase === 2 &&
                        this.state.game.currentPlayer === j &&
                        card.type === "food" ? (
                          <button
                            onClick={() =>
                              this.props.gainFood(card.id, card.value, j)
                            }
                          >
                            Zagraj
                          </button>
                        ) : (
                          ""
                        )}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}
Game.propTypes = {
  game: PropTypes.object.isRequired,
  nextPhase: PropTypes.func.isRequired,
  gainFood: PropTypes.func.isRequired,
  players: PropTypes.array,
  people: PropTypes.array,
  deck: PropTypes.array
};

function mapStateToProps(state) {
  return {
    game: state.game,
    deck: state.deck,
    players: state.players,
    people: state.people
  };
}

const mapDispatchToProps = {
  nextPhase: gameActions.nextPhase,
  gainFood: deckActions.gainFood
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
