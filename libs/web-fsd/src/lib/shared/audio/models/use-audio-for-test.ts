import { useEffect, useRef } from 'react';
import uncorrectedAnswerSound from '../sounds/bad-answer.mp3';
import correctAnswerSound from '../sounds/correct-answer.mp3';
import errorSound from '../sounds/error.mp3';
import clickSound from '../sounds/schelchok.mp3';
import deleteSound from '../sounds/delete.mp3';

export const useAudio = () => {
  const correctAnswerAudio = useRef<HTMLAudioElement>(null);
  const uncorrectedAnswerAudio = useRef<HTMLAudioElement>(null);
  const errorAudio = useRef<HTMLAudioElement>(null);
  const clickAudio = useRef<HTMLAudioElement>(null);
  const deleteAudio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    correctAnswerAudio.current = new Audio(correctAnswerSound);
    uncorrectedAnswerAudio.current = new Audio(uncorrectedAnswerSound);
    errorAudio.current = new Audio(errorSound);
    clickAudio.current = new Audio(clickSound);
    deleteAudio.current = new Audio(deleteSound);

    clickAudio.current.preload = 'auto';
    clickAudio.current.load();

    correctAnswerAudio.current.preload = 'auto';
    correctAnswerAudio.current.load();

    uncorrectedAnswerAudio.current.preload = 'auto';
    uncorrectedAnswerAudio.current.load();

    errorAudio.current.preload = 'auto';
    errorAudio.current.load();

    deleteAudio.current.preload = 'auto';
    deleteAudio.current.load();
  }, []);

  const toPlayAudio = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {
      /* no-op: browser autoplay restriction */
    });
  };

  return {
    correctAnswerAudio,
    uncorrectedAnswerAudio,
    errorAudio,
    clickAudio,
    deleteAudio,
    toPlayAudio,
  };
};
