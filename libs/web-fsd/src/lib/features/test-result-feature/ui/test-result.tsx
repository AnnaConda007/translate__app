import { useEffect, useState } from "react"
import { ITestResultUI } from "../../../entities/test-entities/model/types"
import { ButtonUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
 import { RemoveWordFromDictionaryFeature } from "../../remove-word-from-dictionary-feature/ui/remove-word-dictionary"
 import { auth } from "../../../shared/config/firebase-сonfig";

 interface Props{
  results :ITestResultUI[]
  onContinue:()=>void,
  goToNextTest:()=>void
 }
export const TestResult:React.FC<Props>  = ({results,goToNextTest, onContinue})=>{
               useEffect(()=>{onContinue()},[])
 
    return (
<>
     { results.map(res=>
     <div  key={res.source}>
     <p  className={res.progressDelta ? "bg-green-300" :"bg-red-500"}>{res.source}</p>
           <RemoveWordFromDictionaryFeature  wordToDeleted={res.source}/>

     </div>
      )}
<ButtonUi handleButton={goToNextTest} title={"далее"}/>

</>          )
  }