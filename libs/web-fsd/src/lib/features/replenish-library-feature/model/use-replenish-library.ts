import { useState } from "react";
import { auth } from "../../../shared/config/firebase-сonfig";


export const UseReplanishLibrary = ()=>{
const [title,setTextTitle] = useState("")
const [content,setContent] = useState("")

 const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      setContent(content)
    };
    reader.readAsText(file);
  };
 
 return {
    title,setTextTitle, content, handleFileUpload
 }
}