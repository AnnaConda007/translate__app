import { useEffect } from "react"
import { useTestWidget } from "../model/use-test-widget"
 import {TestTranslateFeature} from "../../../features/test-translate-feature/ui/test-translate-input"
import {TestSelectAnswerFeature} from "../../../features/test-select-answer-feature/ui/test-select-answer"
import {TestResult} from "../../../features/test-result-feature/ui/test-result"

export const TestSelectAnswerWidget	 =()=>{

    const {getWords, results,currentWord,load, finish, empty,currentFalseWords,onResult, goNextChunk} = useTestWidget()
    const progress = currentFalseWords.progress
    
 
    useEffect(()=>{
        getWords()
     },[])

if (load ) return <>Load</>;
 if (   finish) return <TestResult onContinue={goNextChunk} results={results}/>;



if (empty ) return <>Пока словарь пуст</>;

    return (
<>
{progress<=5 &&  <TestSelectAnswerFeature   currentWord={currentWord}  currentFalseWords={currentFalseWords.shuffled} onResult={onResult} />
}
{progress >5  && progress <= 10  &&    <TestTranslateFeature  wordToTest={currentWord.translation} correctAnswer =  {currentWord.source}  onResult={onResult} />
}


{progress>=10  &&         <TestTranslateFeature  wordToTest={currentWord.source} correctAnswer = {currentWord.translation}  onResult={onResult} />

}

       </>    )
} 