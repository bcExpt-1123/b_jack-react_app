import React, { useState } from 'react';

const App: React.FC = () => {
  const deck = (require('../deck.json')).cards;
  const [value, setValue] = useState("");
  const [suit, setSuit] = useState("");

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const activeCard = deck[randomIndex];
    deck.splice(randomIndex, 1);
    console.log(deck);
    console.log(randomIndex);
    console.log(activeCard);
    setValue(activeCard.value);
    switch (activeCard.suit) {
      case 'spades':
        setSuit('♠');
        break;
      case 'diamonds':
        setSuit('♦');
        break;
      case 'clubs':
        setSuit('♣');
        break;
      case 'hearts':
        setSuit('♥');
        break;
      default:
        break;
    }
  }

  const clickHandler = (e: any) => {
    e.preventDefault()
    drawCard();
  }


  return (
    <>
      <div>
        <h1>{value}</h1>
        <h1>{suit}</h1>
      </div>
      <button onClick={clickHandler}>Test</button>
    </>
  );
}

export default App;
