import {  useEffect, useRef, useState } from "react";
 export  interface ModalPosition {
  x: number;
  y: number;
}

export const useWord = ( )=>{
const [position,setPosition] = useState<ModalPosition >()
const [selectedWord, setSelectedWord] = useState<string | null>(null);
const selectedWordRef = useRef<string | null>(null);
const timeoutRef = useRef<number | null>(null);

const timeoutDelay  = 150
const immediateDelay  = 0


       const getSelection= (e:  MouseEvent)=>{
     const target = e.target as HTMLElement;
     const shouldDelay = Boolean(target.closest(".close-delay")) 
     // Задержка нужна, чтобы клик по элементам с .close-delay успел обработаться

 
      if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

const word = target.dataset["word"] || null
      const rect = target.getBoundingClientRect();
     const position = { x: rect.left + window.scrollX, y: rect.bottom + window.scrollY }
     const selection = window.getSelection()?.toString();
     const selectionIsActual = selection?.toString() !=selectedWordRef.current
const selected = selectionIsActual?selection:null
     const text = selected || word
     
          selectedWordRef.current =text
          setSelectionWithDelay(text,position,shouldDelay)
     }


          const  setSelectionWithDelay = (text:string|null, position:ModalPosition,timeout:boolean ) => {
 const delay = timeout? timeoutDelay :immediateDelay
 timeoutRef.current = window.setTimeout(()=>{
   setSelectedWord(text);
    setPosition(position);
 }, delay)
    
   }

    useEffect(()=>{
  window.addEventListener("mouseup", getSelection);
 return () => {
    window.removeEventListener("mouseup", getSelection);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);  
    }
  };},[]
)
 
return { selectedWord, setSelectedWord, position,setPosition}
}