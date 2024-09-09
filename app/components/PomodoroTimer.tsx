'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import styles from '../style/PomodoroTimer.module.css';

interface PomodoroTimerProps {
  initialTime: number;
  onTimerComplete: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ initialTime, onTimerComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      setIsPaused(false);
      onTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeRemaining, onTimerComplete]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(initialTime);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerContainer}>
      <p className={styles.timeDisplay}>Time Remaining: {formatTime(timeRemaining)}</p>
      <div className={styles.buttonContainer}>
        {!isActive && timeRemaining === initialTime ? (
          <Button className={styles.button} onClick={startTimer}>Start Timer</Button>
        ) : isActive && !isPaused ? (
          <>
            <Button className={styles.button} onClick={pauseTimer}>Pause</Button>
            <Button className={styles.button} onClick={resetTimer}>Reset</Button>
          </>
        ) : (
          <>
            <Button className={styles.button} onClick={resumeTimer}>Resume</Button>
            <Button className={styles.button} onClick={resetTimer}>Reset</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
