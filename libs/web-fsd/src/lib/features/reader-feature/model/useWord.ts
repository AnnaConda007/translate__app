import {  useEffect, useRef, useState } from "react";
 export  interface ModalPosition {
  x: number;
  y: number;
}

export const useWord = ( )=>{
const [position,setPosition] = useState<ModalPosition >()
const [selectedWord, setSelectedWord] = useState<string | null>(null);
const selectedWordRef = useRef<string | null>(null);

       const getSelection= (e:  MouseEvent)=>{
     const target = e.target as HTMLElement;
const word = target.dataset["word"] || null
      const rect = target.getBoundingClientRect();
     const position = { x: rect.left + window.scrollX, y: rect.bottom + window.scrollY }
     const selection = window.getSelection()?.toString();
     const selectionIsActual = selection?.toString() !=selectedWordRef.current
const selected = selectionIsActual?selection:null
     const text = selected || word
     setSelectedWord(text)
     setPosition(position)
          selectedWordRef.current =text
     }

    useEffect(()=>{
  window.addEventListener("mouseup", getSelection);
  return ()=>window.removeEventListener("mouseup", getSelection)
},[]
)
 
return { selectedWord, setSelectedWord, position,setPosition}
}