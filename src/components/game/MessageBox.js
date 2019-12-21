import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MessageBox = props => {
  const { game, players, nextPhase } = props;
  const [btnText, setBtnText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    renderSwitch(props.game.phase);
  }, [props.game.phase]);

  const renderSwitch = phase => {
    switch (phase) {
      case 1:
        setBtnText("Losuj");
        setMessage("Nowe zasoby");
        break;
      case 2:
        setBtnText("Zagraj kartę żywności");
        setMessage("Polowanie i zbieranie");
        break;
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
      {game.gameOver ? null : (
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
  nextPhase: PropTypes.func.isRequired
};

export default MessageBox;
