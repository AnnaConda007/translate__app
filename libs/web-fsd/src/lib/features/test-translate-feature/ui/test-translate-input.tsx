import { useEffect, useState } from "react";
 import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input";
import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import { InputStatus } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; 
import { animations } from "../../../shared/theme/tokens/animation";
 import { useAudio } from "../model/use-audio-for-test";

interface Props {
    correctAnswer:string,
    wordToTest:string,
     onResult: (selected: boolean) => void;
 }

export const TestTranslateFeature: React.FC<Props> = ({ wordToTest,correctAnswer,onResult}) => {
const [value, setValue ] = useState("")
const [status, setStatus] = useState<InputStatus>(InputStatus.None)
const [shouldShake, setShouldShake] = useState(false);
const [animateNext,setAnimateNext] = useState(false)
const { correctAnswerAudio, uncorrectedAnswerAudio, errorAudio , toPlayAudio}= useAudio()
 
 
useEffect(()=>{
    setStatus(InputStatus.None)
    setValue("")
    setAnimateNext(false)
    setShouldShake(false);  
}, [wordToTest])


const inputOnchange = (value:string)=>{
setValue(value)
setShouldShake(false)     
}

const onEmptyInput = ()=>{
    if(value  ) return
    setShouldShake(false);  
    requestAnimationFrame(() => setShouldShake(true)); 
    toPlayAudio(  errorAudio)
     return true
    }


const handleNextClick   = ()=>{
const empty = onEmptyInput()
if(empty) return

const isCorrectAnswer = value===correctAnswer
const newStatus = isCorrectAnswer ? InputStatus.Success : InputStatus.Error;
const audio = isCorrectAnswer ? correctAnswerAudio: uncorrectedAnswerAudio;
  toPlayAudio(  audio)
  setStatus(newStatus )
  if(!isCorrectAnswer)  {
 setShouldShake(true)  }   
  else {setAnimateNext(true)} 
setTimeout(()=>{    onResult(isCorrectAnswer)},animations.nextTestCart.durationMs)
}

 
    return ( 
       <div className="overflow-hidden w-full">
<div className= {` flex flex-wrap w-full m-2 ${animateNext && "animate-move-left" }`}>
<div className=" w-full flex justify-start">
        <p className= {` text-base mt-1 mb-1 ${shouldShake ? " animate-move-right" : "" } `}>{wordToTest}</p>
</div>
    <div className={`flex-grow ${shouldShake && 'animate-shake'} ` }>
           <InputUi  status={status}  value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> inputOnchange(e.target.value)}/>
    </div>
 <ButtonIconUi Icon={NavigateNextIcon} handleButton={    handleNextClick   } />
 </div>

        </div>  
)


    

    
} 






 