import { useState } from "react";
 import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input";
import { ButtonUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button";
interface Props {
    correctAnswer:string,
    wordToTest:string,
     onResult: (selected: boolean) => void;
}

export const TestTranslateFeature: React.FC<Props> = ({ wordToTest,correctAnswer,onResult}) => {
    const  [result, setResult] = useState<boolean | null>(null)
const [value, setValue ] = useState("")
 
const handleButton = ()=>{
    const isCorrectAnswer = value===correctAnswer
    onResult(isCorrectAnswer)
    setResult(isCorrectAnswer)

}
 
    return (     
 
 <>
 2222222222222222222
 <p>{wordToTest}</p>
 <InputUi value={value} handleOnChange={(e:React.ChangeEvent<HTMLInputElement>)=> setValue(e.target.value)}/>
    <ButtonUi title={"далее"} handleButton={handleButton}/>
 </>
)


    

    
} 






 