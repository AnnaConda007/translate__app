import { useState } from "react";
import { IDictionary } from "../../../entities/dictionary-entities/model/stor"

interface Props {
    currentWord:IDictionary,
    currentFalseWords:IDictionary[]
    onResult: (selected: boolean) => void;
 
    
}

export const TestSelectAnswerFeature: React.FC<Props> = ({ currentWord, currentFalseWords,onResult}) => {
   const [selected, setSelected] = useState("");

   const handleClick = (selectedValue:string)=>{
setSelected(selectedValue)
const isCorrectAnswer = currentWord.source==selectedValue
 
 onResult(isCorrectAnswer)   }

    return (     
        <>
         <p>{currentWord.translation}</p>
       <form>
        {currentFalseWords.map((w)=>   
         <div key={w.source}>
         <input type="radio" id={w.source}       checked={selected === w.source}  onChange={() => handleClick(w.source)}></input>
         <label htmlFor={w.source}>{w.source}</label>
         </div>
        )}
    </form>
        </>
    
)


    

    
} 






 