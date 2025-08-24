import { useDictionaryStore } from '../../../entities/dictionary-entities/model/stor';
import { addWordToDictionary } from '../../../entities/dictionary-entities/api/add-word-to-dictionary';
import { getDictionaryFromApi } from '../../../entities/dictionary-entities/api/get-dictionary';

export const useAddWordToDictionary = () => {
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  const handleSendWord = async ({
    source,
    translation,
  }: {
    source: string;
    translation: string;
  }) => {
    await addWordToDictionary(source, translation);

    const result = await getDictionaryFromApi();
    setDictionary(result);
  };

  return {
    handleSendWord,
  };
};
