import { useEffect, useState } from "react";
 export  interface ModalPosition {
  x: number;
  y: number;
}

export const useWord = ( )=>{
const [position,setPosition] = useState<ModalPosition >()
const [selectedWord, setSelectedWord] = useState<string | null>(null);

  useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
     if (target.closest(".click-animate") ) {
  
      setTimeout(()=>{    
          setSelectedWord(null);
           
},500)
return
    }
    if (!target.classList.contains("no-close-on-click") && selectedWord) {
      setSelectedWord(null);
    }

  
  };

  window.addEventListener("click", handleClick);
  return () => window.removeEventListener("click", handleClick);
}, [selectedWord]);

  const onWord = ({   selectedWord,  position}: {    selectedWord: string | null;  position: ModalPosition})=>{
    setPosition(position);
      setSelectedWord(selectedWord)
 }
 
return {onWord, selectedWord, setSelectedWord, position,setPosition}
}