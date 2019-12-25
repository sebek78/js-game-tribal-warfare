import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

const PlayerView = props => {
  const { player, deck, people, game } = props;
  const { gainFood, discardCard, attachWeapon } = props;

  let [shadow, setShadow] = useState(false);
  const [weaponCardId, setWeaponCardId] = useState(-1);

  useEffect(() => {}, [shadow, weaponCardId, deck, people]);

  return (
    <div className="game__playerView">
      <div className="playerView__hand">
        <div className="playerView__desc">{`Karty gracza ${player.name}`}</div>
        {deck.map((card, k) => {
          return card.owner === player.id ? (
            <Card
              key={k}
              card={card}
              phase={game.phase}
              currentPlayer={player.id}
              {...(game.phase === 1 &&
                game.cardLimit &&
                game.currentPlayer === player.id && { discardCard })}
              {...(game.phase === 2 &&
                game.currentPlayer === player.id && { gainFood })}
              {...(game.phase === 4 &&
                game.currentPlayer === player.id && {
                  setShadow,
                  setWeaponCardId
                })}
            />
          ) : null;
        })}
      </div>
      <div className="game__playerInfo">
        {`Wioska ${player.name} Żywność: ${player.food}`}
      </div>
      <div className="playerView__cards">
        {people.map((card, i) => {
          return (
            <Card
              key={i}
              card={card}
              {...(game.phase === 4 &&
                game.currentPlayer === player.id && { attachWeapon })}
              shadow={shadow}
              weaponCardId={weaponCardId}
              setShadow={setShadow}
            />
          );
        })}
      </div>
    </div>
  );
};

PlayerView.propTypes = {
  player: PropTypes.object.isRequired,
  deck: PropTypes.array.isRequired,
  game: PropTypes.object.isRequired,
  people: PropTypes.array.isRequired,
  gainFood: PropTypes.func.isRequired,
  discardCard: PropTypes.func.isRequired,
  attachWeapon: PropTypes.func.isRequired
};

export default PlayerView;
