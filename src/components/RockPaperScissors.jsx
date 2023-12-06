import React from 'react';
import styles from './RockPaperScissors.module.css';
import useGameLogic from '../hooks/useGameLogic';
import rockEmoji from '../assets/images/rock-emoji.png';
import paperEmoji from '../assets/images/paper-emoji.png';
import scissorsEmoji from '../assets/images/scissors-emoji.png';

function RockPaperScissors() {
  const {
    score,
    result,
    playerMove,
    computerMove,
    playGame,
    resetScore,
    handleAutoPlay,
  } = useGameLogic();

  const moveIcons = {
    rock: rockEmoji,
    paper: paperEmoji,
    scissors: scissorsEmoji,
  };

  return (
    <div className={styles.body}>
      <p className={styles.title}>Rock Paper Scissors</p>
      {['rock', 'paper', 'scissors'].map((move) => (
        <button key={move} className={styles.moveButton} onClick={() => playGame(move)}>
          <img src={moveIcons[move]} className={styles.moveIcon} alt={move} />
        </button>
      ))}
      <p className={styles.result}>{result}</p>
      <div className={styles.moves}>
        {playerMove && (
          <>
            You <img src={moveIcons[playerMove]} className={styles.moveIcon} alt={playerMove} />
          </>
        )}
        {computerMove && (
          <>
            Computer <img src={moveIcons[computerMove]} className={styles.moveIcon} alt={computerMove} />
          </>
        )}
      </div>
      <p className={styles.score}>Wins: {score.wins}, Losses: {score.losses}, Ties: {score.ties}</p>
      <button onClick={resetScore} className={styles.resetScoreButton}>Reset Score</button>
      <button onClick={handleAutoPlay} className={styles.autoPlayButton}>Auto Play</button>
    </div>
  );
}

export default RockPaperScissors;