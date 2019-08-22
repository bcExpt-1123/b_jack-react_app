import React, { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import Hand from './Hand';
import jsonData from '../deck.json';

const App: React.FC = () => {
  const data = JSON.parse(JSON.stringify(jsonData.cards))
  const [deck, setDeck]: any[] = useState(data);
  const [userCards, setUserCards]: any[] = useState([]);
  const [dealerCards, setDealerCards]: any[] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerTurn, setDealerTurn] = useState(false);
  const [init, setInit] = useState(true);

  //console.log('User Cards Array:', userCards);
  //console.log('Dealer Cards Array:', dealerCards);

  useEffect(() => {
    if (init) {
      drawCard('user');
      drawCard('dealer-hidden');
      drawCard('user');
      drawCard('dealer');
      setInit(false);
    }
  }, [init]);

  useEffect(() => {
    calculate(userCards, setUserScore);
  }, [userCards]);

  useEffect(() => {
    calculate(dealerCards, setDealerScore);
  }, [dealerCards]);

  useEffect(() => {
    if (dealerScore > 17) {
      setDealerTurn(false);
    }
  }, [dealerScore]);

  useEffect(() => {
    if (dealerTurn) {
      drawCard('dealer');
    }
  }, [dealerTurn])

  const resetGame = () => {
    console.clear();
    setDeck(data);
    setUserCards([]);
    setDealerCards([]);
    setInit(true);
  }

  const drawCard = (player: string) => {
    if (deck.length > 0) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      deck.splice(randomIndex, 1);
      setDeck([...deck]);
      //console.log('Last Drawn Card:', card);
      console.log('Remaining Cards:', deck.length);
      switch (card.suit) {
        case 'spades':
          dealCard(player, card.value, '♠');
          break;
        case 'diamonds':
          dealCard(player, card.value, '♦');
          break;
        case 'clubs':
          dealCard(player, card.value, '♣');
          break;
        case 'hearts':
          dealCard(player, card.value, '♥');
          break;
        default:
          break;
      }
    }
    else {
      alert('All cards have been drawn');
    }
  }

  const dealCard = (player: string, value: string, suit: string) => {
    switch (player) {
      case 'user':
        userCards.push({ 'value': value, 'suit': suit, 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'dealer':
        dealerCards.push({ 'value': value, 'suit': suit, 'hidden': false });
        setDealerCards([...dealerCards]);
        break;
      case 'dealer-hidden':
        dealerCards.push({ 'value': value, 'suit': suit, 'hidden': true });
        setDealerCards([...dealerCards]);
        break;
      case 'test-ace':
        userCards.push({ 'value': 'A', 'suit': '♠', 'hidden': false });
        setUserCards([...userCards]);
        break;
      case 'test-king':
        userCards.push({ 'value': 'K', 'suit': '♠', 'hidden': false });
        setUserCards([...userCards]);
        break;
      default:
        break;
    }
  }

  const revealCard = () => {
    dealerCards.filter((card: any) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards])
  }

  const calculate = (cards: any[], setScore: any) => {
    let total = 0;
    cards.forEach((card: any) => {
      if (card.hidden === false && card.value !== 'A') {
        switch (card.value) {
          case 'K':
            total += 10;
            break;
          case 'Q':
            total += 10;
            break;
          case 'J':
            total += 10;
            break;
          default:
            total += Number(card.value);
            break;
        }
      }
    });
    const aces = cards.filter((card: any) => {
      return card.value === 'A';
    });
    aces.forEach((card: any) => {
      if (card.hidden === false) {
        if ((total + 11) > 21) {
          total += 1;
        }
        else if ((total + 11) === 21) {
          if (aces.length > 1) {
            total += 1
          }
          else {
            total += 11
          }
        }
        else {
          total += 11;
        }
      }
    });
    setScore(total);
  }

  const hit = () => {
    drawCard('user');
  }

  const stand = () => {
    revealCard();
    setDealerTurn(true);
  }

  return (
    <>
      <button onClick={() => hit()}>Hit</button>
      <button onClick={() => stand()}>Stand</button>
      <button onClick={() => resetGame()}>Reset</button>
      <Hand title={`Your Hand (${userScore})`} cards={userCards} />
      <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
    </>
  );
}

export default App;
