import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getTextByTitleFromApi } from "../../../entities/library/api/get-text-by-title-from-api";

export const useText = ( setSelectedWord:(word:string|null)=>void)=>{
      const { title } = useParams<{ title: string }>();
      const [text, setText] = useState<string>();
     const [savedParagraphId, setSavedParagraphId] = useState<number>(6);
         const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

const isHtml = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str); 


 const wordsArr = useMemo(() => {
    if (!text) return;

     if (isHtml(text)) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const paragraphs = Array.from(doc.querySelectorAll("p, h1, h2, h3, h4, h5")).map((el) =>
        el.textContent?.trim() ?? ""
      );
       return paragraphs
        .filter(Boolean)
        .map((p) => p.split(/(\s+)/));  
    }

     const cleaned = text 
  const regex = /(?<![А-ЯЁ]\.)(?<=[.?!…])\s+(?=[А-ЯЁ])/g;
    const paragraphs = cleaned.split(regex).map((p) => p.trim()).filter(Boolean);
    return paragraphs.map((p) => p.split(/(\s+)/));
  }, [text]);


 
  const saveCurrentParagraph = useMemo(() => {
    return (startIndex: number) => {
      setSelectedWord(null);
      window.getSelection()?.removeAllRanges();

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        localStorage.setItem(`reader:${title}:paragraph`, `paragraph-${startIndex}`);
      }, 500);
    };
  }, [title, setSelectedWord]);



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