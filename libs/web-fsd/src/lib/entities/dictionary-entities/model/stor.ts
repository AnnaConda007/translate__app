import { create } from 'zustand';

export interface IDictionary {
  source: string;
  translation: string;
  progress: number;
  isLearned: boolean;
}

interface IDictionaryStore {
  dictionary: IDictionary[] | [];
  setDictionary: (words: IDictionary[]) => void;
}

export const useDictionaryStore = create<IDictionaryStore>((set) => ({
  dictionary: [],
  setDictionary: (dictionary) => set({ dictionary }),
}));
