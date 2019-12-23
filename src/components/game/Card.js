import React from "react";
import PropTypes from "prop-types";
import personImg from "./../../img/kr-person1.png";

const Card = props => {
  const { card, phase, currentPlayer } = props;
  const { gainFood, discardCard } = props;

  const renderCardType = cardType => {
    switch (cardType) {
      case "food":
        return `żywność +`;
      case "person":
        return `Siła `;
      default:
        return "Nieznany typ karty";
    }
  };

  const renderButton = (card, phase, currentPlayer) => {
    if (phase !== undefined) {
      if (phase === 1 && discardCard !== undefined) {
        return (
          <button
            className="card__Btn card__Btn--discard"
            onClick={() => discardCard(card.id)}
          >
            Wyrzuć kartę
          </button>
        );
      } else if (
        card.type === "food" &&
        phase === 2 &&
        gainFood !== undefined
      ) {
        return (
          <button
            className="card__Btn card__Btn--play"
            onClick={() => gainFood(card.id, card.value, phase, currentPlayer)}
          >
            Zagraj
          </button>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <div className="card">
      <div className="card__name">
        <div>{card.name}</div>
      </div>
      <div className="card__image">
        {renderButton(card, phase, currentPlayer)}
        {card.type === "person" ? (
          <img className="card__png" src={personImg} />
        ) : (
          <div className="TEST-image"></div>
        )}
      </div>
      <div className="card__value">{`${renderCardType(card.type)}${
        card.value
      }`}</div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  phase: PropTypes.number,
  currentPlayer: PropTypes.number,
  gainFood: PropTypes.func,
  discardCard: PropTypes.func
};

export default Card;
