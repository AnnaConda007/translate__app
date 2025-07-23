import { ITestResult } from "../../../entities/test-entities/model/types"
import { ButtonUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
 import { RemoveWordFromDictionaryFeature } from "../../remove-word-from-dictionary-feature/ui/remove-word-dictionary"

 interface Props{
  results :ITestResult[]
  onContinue:()=>void
 }
export const TestResult:React.FC<Props>  = ({results, onContinue})=>{
 
 
    return (
<>
     { results.map(res=>
     <div  key={res.source}>
     <p>{res.source}{res.progress}</p>
           <RemoveWordFromDictionaryFeature  wordToDeleted={res.source}/>

     </div>
      )}
<ButtonUi handleButton={onContinue} title={"далее"}/>

</>          )
  }