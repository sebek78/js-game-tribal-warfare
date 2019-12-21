import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Card = ({ data }) => {
  useEffect(() => {
    //console.log(data);
  }, []);

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

  return (
    <div className="card">
      <div className="card__name">
        <div>{data.name}</div>
      </div>
      <div className="card__image">
        <div className="TEST-image"></div>
      </div>
      <div className="card__value">{`${renderCardType(data.type)}${
        data.value
      }`}</div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired
};

export default Card;
