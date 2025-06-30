import { title } from "process";
import { useState } from "react";
import { auth } from '../../shared/config/firebase-сonfig';  

 export const HomePage = ()=>{
const [textTitle,setTextTitle] = useState("")
const [text,setText] = useState("")

 const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      setText(content)
    };
    reader.readAsText(file);
  };
 
const sendText = async ()=>{
      const user = auth.currentUser
          if (!user) return
      const token =await user.getIdToken()

 await fetch('http://localhost:3000/api/add-user-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',     
              'Authorization': `Bearer ${token}`, 
 },
             body: JSON.stringify({ text, user_id: 11 }),

      });
    };


    return (
  <>
        <input type="text" onChange={(e)=>setTextTitle(e.target.value)}  value={textTitle}/>
      <input type="file" accept=".txt,.md,.docx" onChange={handleFileUpload} />
      <button onClick={sendText}>
        отправить
      </button>
      </>
    )
}