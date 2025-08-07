import { useEffect } from "react"
import { useTestWidget } from "../model/use-test-widget"
 import {TestTranslateFeature} from "../../../features/test-translate-feature/ui/test-translate-input"
 import {TestResult} from "../../../features/test-result-feature/ui/test-result"
  import { texts } from "../../../shared/ui-texts/ui-texts"
export const TestSelectAnswerWidget	 =()=>{

    const {getWords,results,currentWord,isLoad, isChunkFinished, isEmptyWords,currentFalseWords,onResult, goToNextChunk , goToNextTest} = useTestWidget()
    const progress = currentFalseWords.progress
     useEffect(()=>{
        getWords()
     },[])

if (isLoad ) return <>Load</>;
 if ( isChunkFinished()) return <TestResult onContinue={goToNextChunk }  goToNextTest={goToNextTest} results={results}/>;


 if (isEmptyWords() ) return <>{texts.tests.empty}</>  

    return (
<>
 
{progress<=5 &&   <TestTranslateFeature  wordToTest={currentWord.translation} correctAnswer =  {currentWord.source}  onResult={onResult} />
}
{progress >5  && progress <= 10  &&    <TestTranslateFeature  wordToTest={currentWord.translation} correctAnswer =  {currentWord.source}  onResult={onResult} />
}

{progress>=10  &&      <div   >
       <TestTranslateFeature  wordToTest={currentWord.source} correctAnswer = {currentWord.translation}  onResult={onResult}   />

</div>

}
 


       </>    )
} 