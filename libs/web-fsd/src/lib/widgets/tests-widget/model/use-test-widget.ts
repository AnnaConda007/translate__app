import { IDictionary } from '../../../entities/dictionary-entities/model/stor';
import { ITestResultUI } from '../../../entities/test-entities/types/test-types';
import { useState, useEffect } from 'react';

import { useGetData } from './use-get-data';
import { usePassingTest } from './use-passing-test';

export const useTestWidget = () => {
  const [results, setResults] = useState<ITestResultUI[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentChunk, setCurrentChunk] = useState<IDictionary[]>([]);

  // 🔥 на сервере всегда будет 0, в браузере обновим
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('currentChunkIndex');
      if (saved !== null) {
        setCurrentChunkIndex(parseInt(saved));
      }
    } catch {
      // localStorage может быть недоступен (например, в Safari private mode)
    }
  }, []);

  const currentWord = currentChunk[currentWordIndex];

  const [words, setWords] = useState<IDictionary[][]>([]);
  const [isLoad, setLoad] = useState(false);

  const { getWords, isEmptyWords, currentFalseWords } = useGetData({
    setCurrentChunk,
    setWords,
    setLoad,
    words,
    currentChunk,
    currentChunkIndex,
    currentWord,
  });
  const {
    onResult,
    isChunkFinished,
    goToNextChunk,
    goToNextTest,
    toPrevIndex,
  } = usePassingTest({
    words,
    currentWord,
    setResults,
    results,
    currentChunkIndex,
    setCurrentChunkIndex,
    currentChunk,
    setCurrentChunk,
    currentWordIndex,
    setCurrentWordIndex,
  });

  return {
    results,
    getWords,
    onResult,
    currentChunk,
    currentWord,
    isChunkFinished,
    toPrevIndex,
    goToNextTest,
    isLoad,
    isEmptyWords,
    currentFalseWords,
    currentWordIndex,
    goToNextChunk,
  };
};
 