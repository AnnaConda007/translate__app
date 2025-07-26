import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getTextByTitleFromApi } from "../../../entities/library/api/get-text-by-title-from-api";

export const useText = ( )=>{
      const { title } = useParams<{ title: string }>();
      const [text, setText] = useState<string>();
     const [savedParagraphId, setSavedParagraphId] = useState<number>();


const paragraphs = useMemo(() => {
  return text?.split(/(?<=[.?!])\s+(?=[А-Я])/);
}, [text]);


   const wordsArr = useMemo(() => {
    return paragraphs?.map((p) => p.split(/(\s+)/)) ?? [];
  }, [paragraphs]);

 
  



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
 
    return {title,text, setText, savedParagraphId, wordsArr}
}