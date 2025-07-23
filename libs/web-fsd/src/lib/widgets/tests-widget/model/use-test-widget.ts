 import { getDictionaryFromApi } from "../../../entities/dictionary-entities/api/get-dictionary"
import { IDictionary } from "../../../entities/dictionary-entities/model/stor"
import { ITestResult } from "../../../entities/test-entities/model/types";
import { shuffle } from "../../../shared/utils/shafle"
import { useEffect, useMemo, useState } from "react";
import { updateProgressInDictionary } from "../../../entities/dictionary-entities/api/update-dictionary";
 
 

export const useTestWidget = ()=>{
const [words, setWords] = useState<IDictionary[][]>([])
const [currentWordIndex, setCurrentWordIndex] = useState(0);
const [currentChunkIndex, setCurrentChunkIndex] = useState(() => {
  const saved = localStorage.getItem("currentChunkIndex");
  return saved !== null ? parseInt(saved) : 0;
});

const [currentChunk, setCurrentChunk] = useState<IDictionary[]>([])


const [load, setLoad] = useState(false)
const [results, setResults] = useState <ITestResult[]>([])
const progressValue = 1


useEffect(() => {
  const nextChunk = words[currentChunkIndex];
  if (nextChunk) {
    setCurrentChunk(nextChunk);
    setCurrentWordIndex(0); 
  }
}, [currentChunkIndex, words]);



const goNextWord = () =>{ setCurrentWordIndex((prev) => prev + 1);
 }

const goNextChunk = () => {
  const chunkIndex =  currentChunkIndex>= words.length-1 ? 0 : currentChunkIndex + 1
 

  setCurrentChunkIndex( chunkIndex);

  localStorage.setItem("currentChunkIndex", String(chunkIndex))
    updateProgressInDictionary(results);  
    setResults([])
 };


 

const updateResult = (result: boolean) => {
  const current = currentChunk[currentWordIndex];
  const progressDelta = result ? progressValue : 0;
   setResults((prev) => [
    ...prev,
    {
      source: current.source,
      translation: current.translation,
      progress: current.progress + progressDelta,
    },
  ]);
 };

const onResult = (result: boolean) => {
  updateResult(result);
  goNextWord();
};



   const finish = currentWordIndex>currentChunk.length-1  
 const empty = words.length ===0
 
const currentWord = currentChunk[currentWordIndex];
 
const currentFalseWords = useMemo(() => {
  if (!currentWord) return { shuffled: [], progress: 0 };
const currentWords = [...currentChunk.filter((w) => w !== currentWord), currentWord];
   const shuffled=   shuffle(currentWords);
   const progress = currentWord.progress   
   return {
    progress,
    shuffled
   }
}, [ currentWord, currentChunkIndex]);


const getWords = async ()=>{
    setLoad(true)
  const result=  await  getDictionaryFromApi()
   const size =2
 const wordsChunks = Array.from({ length: Math.ceil(result.length /size) }, (_, i) =>
  result.slice(i * size, i * size + size))
 setCurrentChunk(wordsChunks[currentChunkIndex])

  setWords(wordsChunks)
     setLoad(false)

 }

 return {results,getWords,onResult, currentWord, finish, load, empty, currentFalseWords,goNextChunk}
}