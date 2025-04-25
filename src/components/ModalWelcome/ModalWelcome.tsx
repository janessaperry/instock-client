// Libraries
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Components
import Button from "../Button/Button";
import { CloseIcon } from "../Icons/Icons";
import {
  Alien, ArrowClockwise,
  Butterfly,
  CloudFog,
  CompassRose,
  Cow,
  DiscoBall,
  Flower,
  GameController,
  Ghost,
  HandPeace,
  Heart,
  IconProps,
  Martini,
  MoonStars,
  Pizza,
  Planet,
  Popsicle,
  RocketLaunch,
  Sparkle
} from "@phosphor-icons/react";

// Styles
import "./ModalWelcome.scss";

interface ModalWelcomeProps {
  handleClose: () => void;
}

interface GameCard {
  id: string;
  icon: React.ComponentType<IconProps>;
  matched: boolean;
}

interface SelectedCard {
  id: string;
  iconName: string;
}

const iconOptions = [
  Alien, Butterfly, Cow, Flower, Ghost, Heart, Martini, RocketLaunch, Sparkle, Pizza, Planet, Popsicle, MoonStars, HandPeace, GameController, DiscoBall, CloudFog
];

const getIcons = (num: number) => {
  return iconOptions
    .map(icon => ( { icon, sort: Math.random() } ))
    .sort((a, b) => a.sort - b.sort)
    .map(({ icon }) => icon).slice(0, num);
}

const duplicateCard = (icon: React.ComponentType<IconProps>) => {
  return [
    { id: uuidv4(), icon, matched: false },
    { id: uuidv4(), icon, matched: false }
  ]
}

const generateCards = () => {
  const icons = getIcons(8);
  const gameCardsDoubled = icons.flatMap((icon) => {
    return duplicateCard(icon);
  })

  return gameCardsDoubled
    .map(card => ( { card, sort: Math.random() } ))
    .sort((a, b) => a.sort - b.sort)
    .map(({ card }) => card);
}

function ModalWelcome ({
  handleClose,
}: ModalWelcomeProps) {

  const [ matchedCount, setMatchedCount ] = useState(0);
  const [ gameCards, setGameCards ] = useState<GameCard[]>(() => generateCards());
  const [ selectedCards, setSelectedCards ] = useState<SelectedCard[]>([]);

  const handleCardSelection = (id: string, iconName: string) => {
    if ( selectedCards.length === 2 ) return;
    let isMatched = false;
    gameCards.find(card => {
      if ( card.icon.displayName === iconName && card.matched ) {
        isMatched = true;
        return;
      }
    });
    if ( isMatched ) return;

    setSelectedCards(prevSelected => [ ...prevSelected, { id, iconName } ]);
  }

  const resetGameCards = () => {
    setMatchedCount(0);
    setSelectedCards([]);
    setGameCards(generateCards());
  }

  useEffect(() => {
    const handleMatch = (selectedCards: SelectedCard[]) => {
      const updateMatched = gameCards.map(gameCard => {
        if ( gameCard.icon.displayName === selectedCards[ 0 ].iconName ) gameCard.matched = true;
        return gameCard;
      });

      setGameCards(updateMatched);
      setMatchedCount(prev => ++prev);
    }

    if ( selectedCards.length === 2 ) {
      setTimeout(() => {
        if ( selectedCards[ 0 ].iconName === selectedCards[ 1 ].iconName ) {
          handleMatch(selectedCards);
          setSelectedCards([]);
        }
        else {
          setSelectedCards([]);
        }
      }, 800)
    }
  }, [ gameCards, selectedCards, matchedCount ]);

  const modalSeen = sessionStorage.getItem("modalSeen");
  return (
    <div className="modal modal--welcome">
      <div className="modal__content-wrapper">
        <div className="modal__content">
          <header className="modal__header">
            <h2 className="modal__title">
              {modalSeen === "true" ? "Back for more?" : "Welcome to my InStock demo!"}
            </h2>
            <Button
              icon={<CloseIcon/>}
              className="btn--icon modal__close-btn"
              handleClick={handleClose}
            />
          </header>

          <section className="modal__body">
            <p className="modal__message">
              {modalSeen === "true" ? "Come back and play any time!" : `This is hosted on Render's free tier, so the initial load might take up to 60 seconds... that's why I whipped up this matching game to play while you wait!`}
            </p>

            <div className="memory-game">
              {gameCards.map((card: GameCard) => {
                  const Icon = card.icon;
                  const iconName = Icon.displayName ?? "UnknownIcon";
                  return (
                    <div key={card.id}
                         id={card.id}
                         className={`memory-game__card ${card.matched ? "memory-game__card--matched" : ""} ${selectedCards.some(selected => selected.id === card.id) ? "memory-game__card--selected" : ""}
                         `}
                         onClick={() => handleCardSelection(card.id, iconName)}>
                      <div className="memory-game__card-back">
                        <CompassRose className="memory-game__icon" size={48}/>
                      </div>
                      <div className="memory-game__card-front">
                        <Icon className="memory-game__icon" size={48} weight="duotone"/>
                      </div>
                    </div>
                  )
                }
              )}
              <div className={`memory-game__message ${matchedCount === 8 ? "memory-game__message--visible" : ""}`}>
                <h2>Winner!</h2>
                <Button label="Play Again"
                        icon={<ArrowClockwise size="20"/>}
                        btnType="button" className="btn--primary"
                        handleClick={() => resetGameCards()}/>
              </div>
            </div>
          </section>

          <footer className="modal__footer">
            <Button
              label="Close"
              className="btn--secondary"
              handleClick={handleClose}
            />
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ModalWelcome;
