import { getAllTextTitlesFromApi } from '../../../entities/library/api/get-library-from-api';
import { removeTitleFromDb } from '../../../entities/library/api/remove-title-name-from-db';
import { useLibraryStore } from '../../../entities/library/model/stor';

export const useRemoveTextFromLibrary = () => {
  const setTitles = useLibraryStore((state) => state.setTitles);

  const removeTitle = async ({ title }: { title: string }) => {
    await removeTitleFromDb({ title });
    const result = await getAllTextTitlesFromApi();
    setTitles(result);
  };

  return { removeTitle };
};
