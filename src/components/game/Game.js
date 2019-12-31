import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import * as deckActions from "../../redux/actions/deckActions";
import * as peopleActions from "../../redux/actions/peopleActions";
import PropTypes from "prop-types";
import Header from "./../common/Header";
import MessageBox from "./MessageBox";
import PlayerView from "./PlayerView";

class Game extends React.Component {
  state = {
    game: {
      phase: 0,
      currentPlayer: 1,
      gameOver: false,
      winner: null,
      cardLimit: false,
      cardId: null
    },
    players: [{ name: "" }, { name: "" }],
    people: [],
    deck: []
  };

  componentDidMount() {
    const { game, players, people, deck } = this.props;
    this.setState({
      game,
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
    // console.log(this.state.players);
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
          {this.state.players.map((player, i) => {
            return (
              <PlayerView
                key={i}
                player={player}
                deck={this.state.deck}
                people={this.state.people.filter(person => person.owner === i)}
                game={this.state.game}
                gainFood={this.props.gainFood}
                discardCard={this.props.discardCard}
                attachWeapon={this.props.attachWeapon}
                resolveBattle={this.props.resolveBattle}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  game: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  people: PropTypes.array.isRequired,
  deck: PropTypes.array.isRequired,
  nextPhase: PropTypes.func.isRequired,
  gainFood: PropTypes.func.isRequired,
  discardCard: PropTypes.func.isRequired,
  attachWeapon: PropTypes.func.isRequired,
  resolveBattle: PropTypes.func.isRequired
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
  discardCard: deckActions.discardCard,
  attachWeapon: deckActions.attachWeapon,
  resolveBattle: peopleActions.resolveBattle
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
