import { useState } from "react";
 import { useLibraryStore } from "../../../entities/library/model/stor";
import { getAllTextTitlesFromApi } from "../../../entities/library/api/get-library-from-api";
import {sendTextToServer} from "../../../entities/library/api/sendTextToServer"

import parse, { domToReact } from 'html-react-parser';

export const useAddTextToLibrary = ()=>{
const [title,setTextTitle] = useState("")
const [content,setContent] = useState("")

 const setTitles = useLibraryStore((state) => state.setTitles);


 const handleSendText =   async ({title,content})=>{
  console.log({title})
  await sendTextToServer(title,content)
  const result =await getAllTextTitlesFromApi()
  setTitles(result )

 }


 const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      setContent(String(content))
    };
    reader.readAsText(file);
  };
 
 return {
    title,setTextTitle, content, handleFileUpload, handleSendText
 }
}