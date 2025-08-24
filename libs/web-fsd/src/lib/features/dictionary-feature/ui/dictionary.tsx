import { InputUi } from '../../../shared/ui-kit/ui-kit-input/ui-kit-input';
import { useDictionary } from '../model/use-dictionary';
import { RemoveWordFromDictionaryFeature } from '../../remove-word-from-dictionary-feature/ui/remove-word-dictionary';
import { useEffect, useState } from 'react';
import { deleteByKey, rollbackWord } from '../../../shared/utils/list-utils';
import { IDictionary } from '../../../entities/dictionary-entities/model/stor';
import { texts } from '../../../shared/ui-texts/ui-texts';
import { SkeletonUi } from '../../../shared/ui-kit/ui-kit-skeletons/ui-kit-test-skeleton';

export const DictionaryFeature = () => {
  const {
    searchValue,
    setSearchValue,
    filteredTextTitles,
    isLoad,
    getDictionary,
  } = useDictionary();
  const [list, setList] = useState<IDictionary[]>([]);

  useEffect(() => {
    getDictionary();
  }, [getDictionary]);

  useEffect(() => {
    setList(filteredTextTitles);
  }, [filteredTextTitles]);

  const onDeleted = (title: string) => {
    const newWords = deleteByKey(list, 'source', title);
    setList(newWords);
  };

  const rollback = (word: IDictionary, index: number) => {
    setList((prev) => {
      const words = rollbackWord(prev, word, index);
      return words;
    });
  };

  return (
    <div className=" flex-grow flex flex-col gap-2 ">
      <InputUi
        value={searchValue}
        placeholder={texts.dictionary.inputPlaceholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />
      {isLoad && <SkeletonUi testItemsAmount={10} />}

      {list.map((word, i) => (
        <div key={word.source} className=" flex justify-between ">
          <span className="  transition-transform duration-200 ease-out flex-grow  max-w-96 hover:scale-105  hover:translate-x-2 break-words">
            {' '}
            {word.source} - {word.translation}{' '}
          </span>
          <RemoveWordFromDictionaryFeature
            rollback={rollback}
            wordToDelete={word}
            index={i}
            onDelete={onDeleted}
          />
        </div>
      ))}
    </div>
  );
};
