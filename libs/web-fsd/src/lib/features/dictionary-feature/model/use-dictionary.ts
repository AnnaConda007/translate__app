import { useCallback, useMemo, useState } from 'react';
import { getDictionaryFromApi } from '../../../entities/dictionary-entities/api/get-dictionary';
import {
  useDictionaryStore,
  IDictionary,
} from '../../../entities/dictionary-entities/model/stor';

export const useDictionary = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setDictionary = useDictionaryStore((state) => state.setDictionary);
  const [isLoad, setIload] = useState(false);
  const [isError, setError] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const getDictionary = useCallback(async () => {
    setIload(true);
    setError(false)
    try {
      const result = await getDictionaryFromApi();
      setDictionary(result);
    } 
    catch{
      setError(true)
    }
    finally {
      setIload(false);
    }
  }, [setDictionary]);

  const filteredTextTitles = useMemo(() => {
    const value = searchValue.toLowerCase();
    return dictionary.filter(
      (word: IDictionary) =>
        word.source.toLowerCase().includes(value) ||
        word.translation.toLowerCase().includes(value),
    );
  }, [searchValue, dictionary]);

  return {
    searchValue,
    setSearchValue,
    isLoad,
    filteredTextTitles,
    getDictionary,isError
  };
};
