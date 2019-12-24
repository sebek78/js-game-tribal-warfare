import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CARD_LIMIT } from "./../../game_data/constants";

const MessageBox = props => {
  const { game, players, nextPhase, deck } = props;
  const [btnText, setBtnText] = useState("");
  const [message, setMessage] = useState("");
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    renderSwitch(game.phase);
  }, [game.phase, deck]);

  const renderSwitch = phase => {
    switch (phase) {
      case 1:
        {
          let cardsInHand = deck.reduce((prevValue, card) => {
            if (card.owner === game.currentPlayer) return (prevValue += 1);
            else return prevValue;
          }, 0);
          if (cardsInHand <= CARD_LIMIT) {
            setBtnText("Losuj");
            setMessage("Nowe zasoby");
            setShowBtn(true);
          } else {
            setMessage("Maksymalnie 5 kart w ręce. Wyrzuć dowolną kartę.");
            setShowBtn(false);
          }
        }
        break;
      case 2: {
        let foodCardsInHand = deck.reduce((prevValue, card) => {
          if (card.owner === game.currentPlayer && card.type === "food")
            return (prevValue += 1);
          else return prevValue;
        }, 0);
        if (!showBtn) setShowBtn(true);
        if (foodCardsInHand === 0) {
          setBtnText("Dalej");
          setMessage("Niestety nic nie upolowano i nic nie znaleziono");
        } else {
          setMessage("Możesz zagrać nową kartą żywności");
          setBtnText("Pomiń zdobycie jedzenia");
        }
        break;
      }
      case 3:
        setBtnText("następna tura");
        setMessage("(zdarzenia)");
        break;
      case 4:
        setBtnText("następna tura");
        setMessage("Nowi ludzie w osadzie");
        break;
      case 5:
        setBtnText("następna tura");
        setMessage("Główny posiłek dnia (konsumowanie żywności)");
        break;
      case 6:
        setBtnText("następna tura");
        setMessage("(rajdy)");
        break;
      case 7:
        setBtnText("następna tura");
        setMessage("(wynik rajdu)");
        break;
      case 8:
        setBtnText("następna tura");
        setMessage("Koniec tury - następny gracz");
        break;
      default:
        return;
    }
  };

  return (
    <div className="message-box">
      <span className="message-box__player-info">
        {`Gracz ${players[game.currentPlayer].name}`}
      </span>
      <div className="message-box__text">
        {game.gameOver ? (
          <span>{`Koniec gry! Wygrał gracz ${game.winner}`}</span>
        ) : (
          <span>{message}</span>
        )}
      </div>
      {!game.gameOver && showBtn && (
        <button
          className="message-box__button"
          onClick={() => {
            nextPhase(game.phase, game.currentPlayer);
          }}
        >
          {btnText}
        </button>
      )}
    </div>
  );
};

MessageBox.propTypes = {
  game: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  nextPhase: PropTypes.func.isRequired,
  deck: PropTypes.array.isRequired
};

export default MessageBox;
