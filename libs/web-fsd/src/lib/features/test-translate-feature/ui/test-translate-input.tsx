import { useEffect, useState } from "react";
 import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input";
import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import { InputStatus } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; 
import { animations } from "../../../shared/theme/tokens/animation";
 import { useAudio } from "../../../shared/audio/models/use-audio-for-test";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';import { vibrate } from "../../../shared/utils/vibrate";
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
const [visibleHelp, setVisibleHelp]= useState({
    text :"",
    index:0
})
 


useEffect(()=>{
    setStatus(InputStatus.None)
    setValue("")
    setAnimateNext(false)
    setShouldShake(false);  
        const newVisible = {
        text:"",
        index : 0,
    }
setVisibleHelp(newVisible)
}, [wordToTest])

const handleHelp = ()=>{
    const index = visibleHelp.index +1
        if(index>correctAnswer.length) return

    const text = correctAnswer.slice(0,index)
    const newVisible = {
        text,
        index : index,
    }
setVisibleHelp(newVisible)
  
}

const inputOnchange = (value:string)=>{
setValue(value)
setShouldShake(false)     
}

const onEmptyInput = ()=>{
    if(value  ) return
    setShouldShake(false);  
    requestAnimationFrame(() => setShouldShake(true)); 
    toPlayAudio(  errorAudio.current)
     return true
    }


const handleNextClick   = ()=>{
const empty = onEmptyInput()
if(empty) return

const isCorrectAnswer = value===correctAnswer
const newStatus = isCorrectAnswer ? InputStatus.Success : InputStatus.Error;
const audio = isCorrectAnswer ? correctAnswerAudio: uncorrectedAnswerAudio;
 vibrate()

  toPlayAudio(  audio.current)
  setStatus(newStatus )
  if(!isCorrectAnswer)  {
 setShouldShake(true)  }   
  else {setAnimateNext(true)} 
setTimeout(()=>{    onResult(isCorrectAnswer)},animations.nextTestCart.durationMs)
}

 
    return ( 
        <div className=" pt-2 h-full flex flex-col items-end">
                <ButtonIconUi Icon={RemoveRedEyeIcon}  handleButton={handleHelp}/>
        <div className="flex flex-col flex-grow justify-center">

 <div className= {` overflow-hidden flex flex-wrap w-full m-2 ${animateNext && "animate-move-left" }`}>
                  <p className= {` w-full  text-base mt-1 mb-1 ${shouldShake ? " animate-move-right" : "" } `}>{wordToTest}</p>

      <div className={`flex-grow ${shouldShake && 'animate-shake'} ` }>
        <InputUi  status={status}  value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> inputOnchange(e.target.value)}/>
    </div>
 <ButtonIconUi Icon={NavigateNextIcon} handleButton={    handleNextClick   } />
 </div>
 

              <span className="min-h-8 w-full ml-2 ">{visibleHelp.text}</span>
</div>
   
        </div>




 

 )


    

    
} 






 