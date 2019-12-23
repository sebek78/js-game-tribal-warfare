import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import * as deckActions from "../../redux/actions/deckActions";
import PropTypes from "prop-types";
import Header from "./../common/Header";
import Card from "./Card";
import MessageBox from "./MessageBox";

class Game extends React.Component {
  state = {
    game: {
      phase: 0,
      currentPlayer: 1,
      gameOver: false,
      winner: null,
      cardLimit: false
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

  render() {
    // console.log("render");
    // console.log(this.state.deck);
    return (
      <div className="game">
        <Header />
        <MessageBox
          game={this.state.game}
          players={this.state.players}
          nextPhase={this.props.nextPhase}
          deck={this.state.deck}
        />
        <div className="game__table">
          {this.state.players.map((player, j) => {
            return (
              <div key={j} className="game__playerView">
                <div className="playerView__hand">
                  <div className="playerView__desc">{`Karty gracza ${this.state.players[j].name}`}</div>
                  {this.state.deck.map((card, k) => {
                    return card.owner === j ? (
                      <Card
                        key={k}
                        card={card}
                        phase={this.state.game.phase}
                        currentPlayer={j}
                        {...(this.state.game.phase === 1 &&
                          this.state.game.cardLimit &&
                          this.state.game.currentPlayer === j && {
                            discardCard: this.props.discardCard
                          })}
                        {...(this.state.game.phase === 2 &&
                          this.state.game.currentPlayer === j && {
                            gainFood: this.props.gainFood
                          })}
                      />
                    ) : null;
                  })}
                </div>
                <div className="game__playerInfo">
                  {`Wioska ${this.state.players[j].name} Żywność: ${this.state.players[j].food}`}
                </div>
                <div className="playerView__cards">
                  {this.state.people.map((card, i) => {
                    if (card.owner === j) {
                      return <Card key={i} card={card} />;
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
  discardCard: PropTypes.func.isRequired,
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
  gainFood: deckActions.gainFood,
  discardCard: deckActions.discardCard
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
