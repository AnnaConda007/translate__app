import { create } from 'zustand';

 

interface ILibraryStore {
  titles: string[] | [];
  setTitles: (texts: string[]) => void;
 }

export const useLibraryStore = create<ILibraryStore>((set) => ({
  titles: [],
setTitles: (titles) => set({ titles }),
 
}));
