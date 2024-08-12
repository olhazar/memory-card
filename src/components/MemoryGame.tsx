import React from "react";

import { items } from "../items";
import { Card } from "./Card";

import "../App.css";

export interface Card {
  id: number;
  img: string;
  matched: boolean;
  disabled: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = React.useState<Card[]>([]);
  const [turns, setTurns] = React.useState(0);
  const [firstCard, setFirstCard] = React.useState<Card | null>(null);
  const [secondCard, setSecondCard] = React.useState<Card | null>(null);
  const [disabled, setDisabled] = React.useState(false);

  const handleChoice = (card: Card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  React.useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.img === secondCard.img) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === firstCard.img) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 700);
      }
    }
  }, [firstCard, secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const shuffleCards = () => {
    const shuffledCards = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, matched: false, disabled: false }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // Start a new game automatically

  React.useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="memory-game">
      <h1 className="game-title">MEMORY GAME</h1>
      <p>Your turns: {turns}</p>

      <div className="card-grid">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstCard || card === secondCard || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
};

export default MemoryGame;
