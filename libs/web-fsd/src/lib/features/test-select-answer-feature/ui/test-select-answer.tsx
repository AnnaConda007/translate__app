import { useEffect, useState } from "react";
import { IDictionary } from "../../../entities/dictionary-entities/model/stor"

interface Props {
    currentWord:IDictionary,
    currentFalseWords:IDictionary[]
    onResult: (selected: boolean) => void;
 }

export const TestSelectAnswerFeature = ({ currentWord, currentFalseWords,onResult}:Props) => {
   const [selected, setSelected] = useState("");
     const handleClick = (selectedValue:string)=>{
setSelected(selectedValue)
const isCorrectAnswer = currentWord.source==selectedValue
 onResult(isCorrectAnswer)  

  
}

useEffect(()=>{
    setSelected("")
 


}, [currentWord])

 
    return (     
        <>
         <p>{currentWord.translation}</p>
       <form>
        {currentFalseWords.map((w, i)=>   
         <div key={i}>
         <input type="radio" id={w.source}       checked={selected === w.source}  onChange={() => handleClick(w.source)}></input>
         <label   className={
    selected === w.source
      ? w.source === currentWord.source
        ? "bg-green-500"
        : "bg-red-400"
      : ""
  }
 htmlFor={w.source}>{w.source}</label>
         </div>
        )}
    </form>
        </>
    
)


    

    
} 






 