 import { IDictionary } from "../../../entities/dictionary-entities/model/stor"
import {  ITestResultUI } from "../../../entities/test-entities/types/test-types";
 import { useState } from "react";
  
 import { useGetData } from "./use-get-data";
import { usePassingTest } from "./use-passing-test";

export const useTestWidget = ()=>{
 const [results, setResults] = useState <ITestResultUI[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
const [currentChunk, setCurrentChunk] = useState<IDictionary[]>([])
 const [currentChunkIndex, setCurrentChunkIndex] = useState(() => {
  const saved = localStorage.getItem("currentChunkIndex");
  return saved !== null ? parseInt(saved) : 0;
});
console.log("currentChunk",currentChunk)
console.log("currentWordIndex",currentWordIndex)

const currentWord = currentChunk[currentWordIndex];


 const [words, setWords] = useState<IDictionary[][]>([])
const [isLoad, setLoad] = useState(false)
 

const {getWords, isEmptyWords, currentFalseWords } = useGetData({setCurrentChunk,setWords, setLoad,words,currentChunk,currentChunkIndex,currentWord}) 
const{onResult, isChunkFinished, goToNextChunk,goToNextTest, toPrevIndex}  = usePassingTest({words,currentWord,setResults, results, currentChunkIndex, setCurrentChunkIndex,currentChunk, setCurrentChunk,currentWordIndex, setCurrentWordIndex})


 return {results,getWords,onResult, currentChunk,currentWord, isChunkFinished,toPrevIndex, goToNextTest,isLoad, isEmptyWords, currentFalseWords,currentWordIndex,goToNextChunk }
}