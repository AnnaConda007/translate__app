import { useEffect, useState } from 'react';
import { ITestResultUI } from '../../../entities/test-entities/types/test-types';
import { RemoveWordFromDictionaryFeature } from '../../remove-word-from-dictionary-feature/ui/remove-word-dictionary';
import {InputUi} from '../../../shared/ui-kit/ui-kit-input/ui-kit-input';
import { Status } from '../../../shared/ui-kit/type';
import StartIcon from '@mui/icons-material/Start';
import { ButtonIconUi } from '../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon';
import { vibrate } from '../../../shared/utils/vibrate';
import { useAudio } from '../../../shared/audio/models/use-audio-for-test';
import { deleteByKey, rollbackWord } from '../../../shared/utils/list-utils';

interface Props {
  results: ITestResultUI[];
  onContinue: () => void;
  goToNextTest: () => void;
}
export const TestResult: React.FC<Props> = ({
  results,
  goToNextTest,
  onContinue,
}) => {
  const { clickAudio, toPlayAudio } = useAudio();
  const [words, setWords] = useState(results);

  const onDeleted = (word: string) => {
    const newWords = deleteByKey(words, 'source', word);
    setWords(newWords);
  };

  const rollback = (word: ITestResultUI, index: number) => {
    setWords((prev) => {
      const dd = rollbackWord(prev, word, index);
      return dd;
    });
  };

  const handleContinueTest = () => {
    goToNextTest();
    toPlayAudio(clickAudio.current);
    vibrate();
  };

  useEffect(() => {
    onContinue();
  }, [onContinue]);

  return (
    <main className="flex flex-col justify-center gap-5 h-full">
      <div className="flex flex-col gap-2">
        {words.map((res, i) => {
          const status = res.progressDelta
            ? Status.Success
            : Status.Error;
          return (
            <div className="flex gap-1" key={res.source}>
              <InputUi value={res.source} isReadOnly={true} status={status} />
              <RemoveWordFromDictionaryFeature
                rollback={rollback}
                wordToDelete={res}
                index={i}
                onDelete={onDeleted}
              />
            </div>
          );
        })}
      </div>
      <ButtonIconUi handleButton={handleContinueTest} Icon={StartIcon} />
    </main>
  );
};
