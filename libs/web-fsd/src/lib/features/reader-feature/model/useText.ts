import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getTextByTitleFromApi } from "../../../entities/library/api/get-text-by-title-from-api";

export const useText = ( setSelectedWord:(word:string|null)=>void)=>{
      const { title } = useParams<{ title: string }>();
      const [text, setText] = useState<string>();
     const [savedParagraphId, setSavedParagraphId] = useState<number>();


const wordsArr = useMemo(() => {
if(!text) return
const cleaned = text
  .replace(/\r\n/g, "\n")

   .replace(/([А-ЯЁ])\.\s*\n+\s*([А-ЯЁ])\.?\s*\n+\s*([А-ЯЁа-яё]+)/g, "$1. $2. $3")  
  .replace(/([А-ЯЁ])\.\s*\n+\s*([А-ЯЁа-яё]+)/g, "$1. $2")         

   .replace(/([а-яёА-ЯЁ\.\*!?»”"\d])(?=(?:ГЛАВА|Глава|глава)\s+\d+)/g, "$1\n");

const regex = /(?<![А-ЯЁ]\.)(?<=[.?!…])\s+(?=[А-ЯЁ])|(?<=\n)(?=(?:ГЛАВА|Глава|глава)\s+\d+)/g;

const paragraphs = cleaned.split(regex).map(p => p.trim()).filter(Boolean);

 
    return paragraphs?.map((p) => p.split(/(\s+)/)) ?? [];

}, [text]);





 
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 
   const saveCurrentParagraph = (startIndex: number) => {
 setSelectedWord(null)
  if (debounceTimer.current) {
       clearTimeout(debounceTimer.current); 
     }
 debounceTimer.current = setTimeout(() => {
       localStorage.setItem(`reader:${title}:paragraph`, `paragraph-${startIndex}`);
     }, 3000);  };
  
  



      useEffect(() => {
      const fetchText = async () => {
        if (!title) return;
        const plainText = await getTextByTitleFromApi(title);  
        setText(plainText);
    
        const saved = localStorage.getItem(`reader:${title}:paragraph`) ;
        if(!saved)return
       const pId =  parseInt(saved.replace("paragraph-", ""), 10) | 0
 setSavedParagraphId(pId);
    
    
      };
    
      fetchText();
    }, [title]);
 
    return {title,text, setText, savedParagraphId, wordsArr, saveCurrentParagraph}
}