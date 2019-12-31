import React, { /* useState,*/ useEffect } from "react";
import PropTypes from "prop-types";
import personImg from "./../../img/kr-person1.png";

const Card = props => {
  const {
    card,
    phase,
    currentPlayer,
    shadow,
    weaponCardId,
    weaponCardType
  } = props;
  const {
    gainFood,
    discardCard,
    setShadow,
    attachWeapon,
    setWeaponCardId,
    setWeaponCardType,
    resolveBattle
  } = props;

  useEffect(() => {}, [weaponCardId]);

  const renderCardValue = ({ type, value, meleeWeapon, rangeWeapon }) => {
    switch (type) {
      case "food":
        return <div>{`Żywność +${value}`}</div>;
      case "person":
        return (
          <>
            <div>{`Siła ${
              meleeWeapon !== null ? (value += meleeWeapon.value) : value
            }`}</div>
            {meleeWeapon !== null ? <div>{`${meleeWeapon.name}`}</div> : null}
            {rangeWeapon !== null ? (
              <div>{`${rangeWeapon.name} ${rangeWeapon.value}`}</div>
            ) : null}
          </>
        );
      case "rangeWeapon":
        return <div>{`Atak ${value}`}</div>;
      case "meleeWeapon":
        return <div>{`Siła +${value}`}</div>;
      case "raid":
        return <div>{`Rajd`}</div>;
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
        action = () => handleWeaponCard(card.id, card.type);
      } else if (phase === 6 && card.type === "raid" && resolveBattle !== undefined) {
        styleBtn = "card__Btn--discard";
        text = "Atak";
        action = () => resolveBattle(card.id, currentPlayer);
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

  const handleWeaponCard = (id, type) => {
    setShadow(true);
    if (setWeaponCardId !== undefined) setWeaponCardId(id);
    if (setWeaponCardType !== undefined) setWeaponCardType(type);
  };

  const addWeapon = (type, shadow, cardId, weaponCardId) => {
    if (type === "person" && shadow === true) {
      attachWeapon(cardId, weaponCardId);
      setShadow(false);
      if (setWeaponCardId !== undefined) setWeaponCardId(-1);
    }
  };

  const renderShadow = (shadow, weaponCardType, card) => {
    if (card.type === "person") {
      if (weaponCardType === "rangeWeapon" && card.rangeWeapon !== null)
        shadow = false;
      if (weaponCardType === "meleeWeapon" && card.meleeWeapon !== null)
        shadow = false;
      return shadow ? " card__shadow" : "";
    } else {
      return "";
    }
  };

  return (
    <div
      className={"card" + renderShadow(shadow, weaponCardType, card)}
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
  weaponCardType: PropTypes.string,
  setWeaponCardType: PropTypes.func,
  setWeaponCardId: PropTypes.func,
  resolveBattle: PropTypes.func,
  gainFood: PropTypes.func,
  discardCard: PropTypes.func,
  attachWeapon: PropTypes.func
};

export default Card;
