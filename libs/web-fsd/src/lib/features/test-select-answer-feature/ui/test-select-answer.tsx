import { useEffect, useState } from 'react';
import { IDictionary } from '../../../entities/dictionary-entities/model/stor';
import { animations } from '../../../shared/theme/tokens/animation';
import {
  InputStatus,
  InputUi,
} from '../../../shared/ui-kit/ui-kit-input/ui-kit-input';
import { useAudio } from '../../../shared/audio/models/use-audio-for-test';
import { vibrate } from '../../../shared/utils/vibrate';
interface Props {
  currentWord: IDictionary;
  currentFalseWords: IDictionary[];
  onResult: (selected: boolean) => void;
}

export const TestSelectAnswerFeature = ({
  currentWord,
  currentFalseWords,
  onResult,
}: Props) => {
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState<InputStatus>(InputStatus.None);
  const [animation, setAnimation] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const { correctAnswerAudio, uncorrectedAnswerAudio, toPlayAudio } =
    useAudio();

  useEffect(() => {
    setStatus(InputStatus.None);
    setSelected('');
    setAnimation('');
    setIsLocked(false);
  }, [currentWord]);

  const handleTestClick = (selectedValue: string) => {
    if (isLocked) return;
    const isCorrectAnswer = currentWord.source === selectedValue;
    const newStatus = isCorrectAnswer ? InputStatus.Success : InputStatus.Error;
    const audio = isCorrectAnswer ? correctAnswerAudio : uncorrectedAnswerAudio;

    vibrate();
    setIsLocked(true);
    toPlayAudio(audio.current);
    setStatus(newStatus);
    setSelected(selectedValue);
    setAnimation(isCorrectAnswer ? 'animate-move-left' : 'animate-move-right');

    setTimeout(() => {
      onResult(isCorrectAnswer);
    }, animations.nextTestCart.durationMs);
  };

  return (
    <article
      className={`flex flex-col gap-2  w-full items-center  ${animation} `}
    >
      <p className="font-normal text-lg tracking-wider">
        {currentWord.translation}
      </p>
      <div role="radiogroup">
        {currentFalseWords.map((w) => {
          const isSelected = selected === w.source;

          return (
            <div
              className="m-2  max-w-60 h-8 "
              key={w.source}
              role="radio"
              aria-checked={isSelected}
            >
              <InputUi
                isReadOnly={true}
                onClick={() => handleTestClick(w.source)}
                status={isSelected ? status : InputStatus.None}
                value={w.source}
              />
            </div>
          );
        })}
      </div>
    </article>
  );
};
