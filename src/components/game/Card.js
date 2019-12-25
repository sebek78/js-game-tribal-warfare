import React, { /* useState,*/ useEffect } from "react";
import PropTypes from "prop-types";
import personImg from "./../../img/kr-person1.png";

const Card = props => {
  const { card, phase, currentPlayer, shadow, weaponCardId } = props;
  const {
    gainFood,
    discardCard,
    setShadow,
    attachWeapon,
    setWeaponCardId
  } = props;

  useEffect(() => {}, [weaponCardId]);

  const renderCardValue = ({ type, value, meleeWeapon, rangeWeapon }) => {
    let text = "";
    switch (type) {
      case "food":
        return `Żywność +${value}`;
      case "person":
        if (meleeWeapon !== null) {
          value += meleeWeapon.value;
          text = `${meleeWeapon.name}`;
        }
        if (rangeWeapon !== null)
          text = `${rangeWeapon.name} ${rangeWeapon.value}`;
        return `Siła ${value} ${text}`;
      case "rangeWeapon":
        return `Atak ${value}`;
      case "meleeWeapon":
        return `Siła +${value}`;
      default:
        return "Nieznany typ karty";
    }
  };

  const renderButton = (card, phase, currentPlayer) => {
    if (phase !== undefined) {
      let styleBtn, action, text;
      if (phase === 1 && discardCard !== undefined) {
        styleBtn = "card__Btn--discard";
        action = () => discardCard(card.id);
        text = "Wyrzuć kartę";
      } else if (
        phase === 2 &&
        card.type === "food" &&
        gainFood !== undefined
      ) {
        styleBtn = "card__Btn--play";
        action = () => gainFood(card.id, card.value, phase, currentPlayer);
        text = "Zagraj";
      } else if (
        phase === 4 &&
        setShadow !== undefined &&
        (card.type === "rangeWeapon" || card.type === "meleeWeapon")
      ) {
        styleBtn = "card__Btn--play";
        text = "Przydziel";
        action = () => handleClick(card.id);
      }
      if (text !== undefined)
        return (
          <button className={`card__Btn ${styleBtn}`} onClick={action}>
            {text}
          </button>
        );
    } else {
      return null;
    }
  };

  const handleClick = id => {
    setShadow(true);
    if (setWeaponCardId !== undefined) setWeaponCardId(id);
  };

  const addWeapon = (type, shadow, cardId, weaponCardId) => {
    if (type === "person" && shadow === true) {
      attachWeapon(card.id, weaponCardId);
      setShadow(false);
      if (setWeaponCardId !== undefined) setWeaponCardId(-1);
    }
  };

  return (
    <div
      className={shadow ? "card card__shadow" : "card"}
      onClick={() => addWeapon(card.type, shadow, card.id, weaponCardId)}
    >
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
      <div className="card__value">{renderCardValue(card)}</div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  phase: PropTypes.number,
  currentPlayer: PropTypes.number,
  shadow: PropTypes.bool,
  setShadow: PropTypes.func,
  weaponCardId: PropTypes.number,
  setWeaponCardId: PropTypes.func,
  gainFood: PropTypes.func,
  discardCard: PropTypes.func,
  attachWeapon: PropTypes.func
};

export default Card;
