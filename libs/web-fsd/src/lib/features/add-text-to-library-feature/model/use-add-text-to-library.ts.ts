import { useState } from 'react';
import { useLibraryStore } from '../../../entities/library/model/stor';
import { getAllTextTitlesFromApi } from '../../../entities/library/api/get-library-from-api';
import { sendTextToServer } from '../../../entities/library/api/sendTextToServer';
import { texts } from '../../../shared/ui-texts/ui-texts';

export const useAddTextToLibrary = () => {
  const [title, setTextTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileAdded, setFileAdded] = useState(false);
  const [isAlreadyExistText, setIsAlreadyExist] = useState<string | null>(null);
  const titles = useLibraryStore((state) => state.titles);

  const setTitles = useLibraryStore((state) => state.setTitles);

  const handleSendText = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    const alreadyExist = titles.includes(title);
    if (alreadyExist) {
      setIsAlreadyExist(texts.library.alreadyExist);
      return;
    }
    await sendTextToServer(title, content);
    const result = await getAllTextTitlesFromApi();
    setTitles(result);
    setFileAdded(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileName = file.name.replace(/\.[^/.]+$/, '');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      setContent(String(content));
    };
    reader.readAsText(file);

    return fileName;
  };

  return {
    title,
    setTextTitle,
    content,
    handleFileUpload,
    handleSendText,
    fileAdded,
    isAlreadyExistText,
    setFileAdded,
    setIsAlreadyExist,
  };
};
