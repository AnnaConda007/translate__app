import { useState } from "react";
 export  interface ModalPosition {
  x: number;
  y: number;
}

export const useWord = ( )=>{
const [position,setPosition] = useState<ModalPosition >()
const [selectedWord, setSelectedWord] = useState<string | null>(null);


  const onWord = ({   selectedWord,  position}: {    selectedWord: string | null;  position: ModalPosition})=>{
    setPosition(position);
      setSelectedWord(selectedWord)
 }
 
return {onWord, selectedWord, setSelectedWord, position,setPosition}
}