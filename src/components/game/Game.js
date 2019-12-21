import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import * as deckActions from "../../redux/actions/deckActions";
import PropTypes from "prop-types";
import Header from "./../common/Header";
import Card from "./Card";

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
      // console.log("update game");
      this.setState({ game: this.props.game });
    }
    if (this.props.deck !== prevProps.deck) {
      // console.log("update deck");
      this.setState({ deck: this.props.deck });
    }
    if (this.props.players !== prevProps.players) {
      // console.log("update players");
      this.setState({ players: this.props.players });
    }
    if (this.props.people !== prevProps.people) {
      // console.log("update people");
      this.setState({ people: this.props.people });
    }
  }

  renderSwitch = () => {
    switch (this.state.game.phase) {
      case 1:
        return "Nowe zasoby - Losuj kartę";
      case 2:
        return "Polowanie i zbieranie - Zagraj kartę żywności";
      case 4:
        return "Nowi ludzie w osadzie";
      case 5:
        return "Główny posiłek dnia (konsumowanie żywności)";
      default:
        return "Następna faza";
    }
  };

  render() {
    // console.log("render");
    //console.log(this.state.deck);
    return (
      <div className="game">
        <Header />
        <div className="game__message-box">
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
        </div>
        <div className="game__table">
          {this.state.players.map((player, j) => {
            return (
              <div key={j} className="game__playerView">
                <div className="game__playerInfo">
                  Gracz: {this.state.players[j].name}
                  <span style={{ marginLeft: 10 }}>
                    Żywność: {this.state.players[j].food}
                  </span>
                </div>
                <p className="playerView__label">Karty</p>
                <div className="playerView__hand">
                  {this.state.deck.map((card, k) => {
                    let key2 = k + 1000;
                    if (card.owner === j) {
                      return (
                        <div className="TEST-temp" key={k}>
                          <Card data={card} />
                          {this.state.game.phase === 2 &&
                          this.state.game.currentPlayer === j &&
                          card.type === "food" ? (
                            <button
                              key={key2}
                              onClick={() =>
                                this.props.gainFood(card.id, card.value, j)
                              }
                            >
                              Zagraj
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="playerView__cards">
                  {this.state.people.map((person, i) => {
                    if (person.owner === j) {
                      return <Card key={i} data={person} />;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
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
