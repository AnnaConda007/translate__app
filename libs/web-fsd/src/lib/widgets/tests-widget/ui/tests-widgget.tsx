import { useEffect } from 'react';
import { useTestWidget } from '../model/use-test-widget';
import { TestTranslateFeature } from '../../../features/test-translate-feature/ui/test-translate-input';
import { TestResult } from '../../../features/test-result-feature/ui/test-result';
import { texts } from '../../../shared/ui-texts/ui-texts';
import { TestSelectAnswerFeature } from '../../../features/test-select-answer-feature/ui/test-select-answer';
import UndoIcon from '@mui/icons-material/Undo';
import { ButtonIconUi } from '../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon';
import { ProgressBarUi } from '../../../shared/ui-kit/ui-kit-progress-bar/ui-kit-progress-bar';
import { useAudio } from '../../../shared/audio/models/use-audio-for-test';
import { vibrate } from '../../../shared/utils/vibrate';
import { SkeletonUi } from '../../../shared/ui-kit/ui-kit-skeletons/ui-kit-test-skeleton';

export const TestSelectAnswerWidget = () => {
  const {
    getWords,
    results,
    currentWord,
    isLoad,
    currentChunk,
    toPrevIndex,
    isChunkFinished,
    currentWordIndex,
    isEmptyWords,
    currentFalseWords,
    onResult,
    goToNextChunk,
    goToNextTest,
  } = useTestWidget();
  const progress = currentFalseWords.progress;
  const { clickAudio, toPlayAudio } = useAudio();

  const handlePrev = () => {
    vibrate();
    toPlayAudio(clickAudio.current);
    toPrevIndex();
  };

  useEffect(() => {
    getWords();
  }, [getWords]);

  if (isLoad)
    return (
      <main className="container mx-auto flex-grow flex justify-center items-center ">
        <div className=" w-full max-w-60 ">
          <SkeletonUi testItemsAmount={4} />
        </div>
      </main>
    );
  if (isChunkFinished())
    return (
      <TestResult
        onContinue={goToNextChunk}
        goToNextTest={goToNextTest}
        results={results}
      />
    );
  if (isEmptyWords()) return texts.tests.empty;

  return (
    <main className="container mx-auto flex-grow flex justify-center items-center">
      <div className="w-full flex flex-col items-start">
        {progress <= 5 && (
          <TestSelectAnswerFeature
            currentWord={currentWord}
            currentFalseWords={currentFalseWords.shuffled}
            onResult={onResult}
          />
        )}
        {progress > 5 && progress <= 10 && (
          <TestTranslateFeature
            wordToTest={currentWord.translation}
            correctAnswer={currentWord.source}
            onResult={onResult}
          />
        )}
        {progress >= 10 && (
          <TestTranslateFeature
            wordToTest={currentWord.source}
            correctAnswer={currentWord.translation}
            onResult={onResult}
          />
        )}
        <ButtonIconUi Icon={UndoIcon} handleButton={handlePrev} />
        <ProgressBarUi
          currentIndex={currentWordIndex}
          totalLength={currentChunk.length}
        />
      </div>
    </main>
  );
};
