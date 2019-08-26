import React, { useState } from 'react';
import styles from './styles/Controls.module.css';

type ControlsProps = {
  gameState: number,
  buttonState: any,
  betEvent: any,
  hitEvent: any,
  standEvent: any,
  resetEvent: any
};

const Controls: React.FC<ControlsProps> = ({ gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent }) => {
  const [amount, setAmount] = useState(0);

  const amountChange = (e: any) => {
    setAmount(e.target.value);
  }

  const getControls = () => {
    if (gameState === 0) {
      return (
        <div className={styles.controlsContainer}>
          <div className={styles.betContainer}>
            <p>Amount:</p>
            <input type="text" className={styles.input} value={amount} onChange={amountChange} />
          </div>
          <button onClick={() => betEvent(amount)} className={styles.button}>Bet</button>
        </div>
      );
    }
    else {
      return (
        <div className={styles.controlsContainer}>
          <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className={styles.button}>Hit</button>
          <button onClick={() => standEvent()} disabled={buttonState.standDisabled} className={styles.button}>Stand</button>
          <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className={styles.button}>Reset</button>
        </div>
      );
    }
  }

  return (
    <>
      {getControls()}
    </>
  );
}

export default Controls;