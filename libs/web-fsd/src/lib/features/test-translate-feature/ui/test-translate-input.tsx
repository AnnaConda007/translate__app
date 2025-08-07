import { useEffect, useState } from "react";
 import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input";
import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import { InputStatus } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import uncorrectedAnswerSound from "../../../shared/sounds/bad-answer.mp3";
 import correctAnswerSound from "../../../shared/sounds/correct-answer.mp3";
 import errorSound from "../../../shared/sounds/error.mp3";

import { animations } from "../../../shared/theme/tokens/animation";
 import { colors } from "../../../shared/theme/tokens/colors";

interface Props {
    correctAnswer:string,
    wordToTest:string,
     onResult: (selected: boolean) => void;
 }

export const TestTranslateFeature: React.FC<Props> = ({ wordToTest,correctAnswer,onResult}) => {
 const [value, setValue ] = useState("")
const [status, setStatus] = useState<InputStatus>(InputStatus.None)
const correctAnswerAudio = new Audio(correctAnswerSound);
const uncorrectedAnswerAudio = new Audio(uncorrectedAnswerSound);
const errorAudio = new Audio(errorSound);

  const [shouldShake, setShouldShake] = useState(false);
const [animateNext,setAnimateNext] = useState(false)

 
  useEffect(()=>{
    setStatus(InputStatus.None)
    setValue("")
    setAnimateNext(false)

 
}, [wordToTest])

const inputOnchange = (value:string)=>{

setValue(value)
          setShouldShake(false)     

}

const handleButton = ()=>{
    if(!value) {
   setShouldShake(false);  
requestAnimationFrame(() => setShouldShake(true)); 
errorAudio.play()

         return
    }
setAnimateNext(true)
          setShouldShake(false)     
     const isCorrectAnswer = value===correctAnswer
     const audio = isCorrectAnswer ? correctAnswerAudio: uncorrectedAnswerAudio;
audio.play()

const newStatus = isCorrectAnswer ? InputStatus.Success : InputStatus.Error;

setStatus(newStatus )
    setTimeout(()=>{    onResult(isCorrectAnswer)
 

},animations.nextTestCart.durationMs)
}

 
    return ( 
 
        <>
       <div className="overflow-hidden w-full">

<div className= {` flex flex-wrap w-full m-2 ${animateNext && "animate-move-left" }`}>
<div className=" w-full flex justify-start">
        <p className= {` text-base mt-1 mb-1 ${shouldShake ? " animate-move-right" : "" } `}>{wordToTest}</p>

</div>
    <div className={`flex-grow ${shouldShake && 'animate-shake'} ` }>
           <InputUi  status={status}  value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> inputOnchange(e.target.value)}/>

    </div>
 <ButtonIconUi Icon={NavigateNextIcon} handleButton={    handleButton  } />
 </div>

        </div>  </>
)


    

    
} 






 