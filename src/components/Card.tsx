import React from "react";

interface CardProps {
  card: {
    id: number;
    img: string;
    matched: boolean;
    disabled: boolean;
  };
  handleChoice: (card: {
    id: number;
    img: string;
    matched: boolean;
    disabled: boolean;
  }) => void;
  flipped: boolean;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  const onClickBack = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.img} alt="card front" />
        <img
          className="back"
          src="/assets/question1.png"
          alt="card back"
          onClick={onClickBack}
        />
      </div>
    </div>
  );
};
