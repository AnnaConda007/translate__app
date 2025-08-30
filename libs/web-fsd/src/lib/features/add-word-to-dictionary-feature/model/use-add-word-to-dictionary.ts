import { useDictionaryStore } from '../../../entities/dictionary-entities/model/stor';
import { addWordToDictionary } from '../../../entities/dictionary-entities/api/add-word-to-dictionary';
import { getDictionaryFromApi } from '../../../entities/dictionary-entities/api/get-dictionary';
import { useState } from 'react';
import { texts } from '../../../shared/ui-texts/ui-texts';

export const useAddWordToDictionary = () => {
  const setDictionary = useDictionaryStore((state) => state.setDictionary);
    const dictionary = useDictionaryStore((s) => s.dictionary);

  const [alreadyExistText, setAlreadyExistText] = useState<string | null>(null);

  const handleSendWord = async ({
    source,
    translation,
  }: {
    source: string;
    translation: string;
  }) => {
        const normalized = source.trim().toLowerCase();

       const exists = dictionary.some(
      (w) => { 
            console.log(w, normalized)

        return w.source.trim().toLowerCase() === normalized}
    );
        if (exists) {
          setAlreadyExistText(texts.dictionary.alreadyExist);
          return;
        }
    await addWordToDictionary(source, translation);

    const result = await getDictionaryFromApi();
    setDictionary(result);
  };

  return {
    handleSendWord,alreadyExistText
  };
};
