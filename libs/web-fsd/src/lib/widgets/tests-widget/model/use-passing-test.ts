 import { IDictionary } from "../../../entities/dictionary-entities/model/stor";
import { ITestResultUI } from "../../../entities/test-entities/types/test-types";
import { updateProgressInDictionary } from "../../../entities/dictionary-entities/api/update-dictionary";

interface Props {
    words:IDictionary[][] 
    results :ITestResultUI[],
    setResults:React.Dispatch<React.SetStateAction<ITestResultUI[]>>,
    setCurrentWordIndex:React.Dispatch<React.SetStateAction<number>>,
    currentWordIndex:number,
    setCurrentChunk:React.Dispatch<React.SetStateAction<IDictionary[]>>,
    currentChunk:IDictionary[]
  setCurrentChunkIndex:React.Dispatch<React.SetStateAction<number>>,
      currentWord:IDictionary,
      currentChunkIndex:number

  }

export const usePassingTest  = ({words,setResults, results,currentWord, setCurrentChunkIndex,currentChunkIndex,currentChunk, setCurrentChunk,currentWordIndex, setCurrentWordIndex}:Props)=>{
    const progressIncrement = 1
  
 

      const toPrevIndex = ()=>{
      if(currentWordIndex<1) return
      setCurrentWordIndex((prev)=>prev-1)
     }


 const goToNextTest = () => {
  setResults([])
    setCurrentWordIndex(0)  
  setCurrentChunkIndex(prev => {
    const nextIndex = prev+1
const newIndex = nextIndex>=words.length ? 0:nextIndex
    setCurrentChunk(words[newIndex])
    return newIndex
  })
}
 
    const updateResult = (result: boolean) => {
  const current = currentChunk[currentWordIndex];
  const progressDelta = result ? progressIncrement : 0;
   setResults((prev) => [
    ...prev,
    {
      source: current.source,
      translation: current.translation,
      progress: current.progress + progressDelta,
      progressDelta,
      
    },
  ]);
 
  };


const onResult = (result: boolean) => {
  updateResult(result);
setCurrentWordIndex((prev) => prev + 1);  };


   const isChunkFinished = ()=>{
    if(!currentChunk.length) return 
    return currentWordIndex>currentChunk.length-1 
   }
 

   


 const goToNextChunk  = () => {
      const nextIndex = currentChunkIndex+1
const newIndex = nextIndex>=words.length ? 0:nextIndex
   localStorage.setItem("currentChunkIndex", String(newIndex))
const resToDb = results.map(({ progressDelta: _, ...rest }) => rest);
    updateProgressInDictionary(resToDb);  
 };


 


return {onResult, isChunkFinished, goToNextChunk,goToNextTest, toPrevIndex,setCurrentChunk, currentWord}



}