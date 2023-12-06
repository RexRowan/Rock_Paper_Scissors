import { useState, useEffect } from 'react';

const useGameLogic = () => {
  const [score, setScore] = useState(() => JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 });
  const [result, setResult] = useState('');
  const [playerMove, setPlayerMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const playGame = (playerChoice) => {
    const computerChoice = pickComputerMove();
    setPlayerMove(playerChoice);
    setComputerMove(computerChoice);

    const outcome = determineOutcome(playerChoice, computerChoice);
    setResult(outcome);
    updateScore(outcome);
  };

  const updateScore = (outcome) => {
    setScore((prevScore) => {
      const newScore = { ...prevScore };
      if (outcome === 'You win.') {
        newScore.wins += 1;
      } else if (outcome === 'You lose.') {
        newScore.losses += 1;
      } else if (outcome === 'Tie.') {
        newScore.ties += 1;
      }
      return newScore;
    });
  };

  const pickComputerMove = () => {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  };

  const determineOutcome = (player, computer) => {
    if (player === computer) {
      return 'Tie.';
    }
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'scissors' && computer === 'paper') ||
      (player === 'paper' && computer === 'rock')
    ) {
      return 'You win.';
    }
    return 'You lose.';
  };

  const handleAutoPlay = () => {
    if (!isAutoPlaying) {
      const newIntervalId = setInterval(() => {
        playGame(pickComputerMove());
      }, 1000);
      setIntervalId(newIntervalId);
      setIsAutoPlaying(true);
    } else {
      clearInterval(intervalId);
      setIsAutoPlaying(false);
    }
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 });
    localStorage.removeItem('score');
  };

  return {
    score,
    result,
    playerMove,
    computerMove,
    playGame,
    resetScore,
    handleAutoPlay,
  };
};

export default useGameLogic;