 import { useMemo } from "react"
import { getDictionaryFromApi } from "../../../entities/dictionary-entities/api/get-dictionary"
import { IDictionary } from "../../../entities/dictionary-entities/model/stor"
   import { shuffle } from "../../../shared/utils/shafle"

interface Props {
  currentChunkIndex:number,
words:IDictionary[][],
setWords: React.Dispatch<React.SetStateAction<IDictionary[][]>>,
  setCurrentChunk: React.Dispatch<React.SetStateAction<IDictionary[]>>
setLoad: React.Dispatch<React.SetStateAction<boolean>>
    currentChunk:IDictionary[]
    currentWordIndex:number,

}

export const useGetData = ({setCurrentChunk,setWords, setLoad,words,currentWordIndex,currentChunk,currentChunkIndex} :Props)=>{ 
 
  
  const testWordsLength = 10
const isEmptyWords = () => (words[0]?.length ?? 0) <testWordsLength ;
 
const currentWord = currentChunk[currentWordIndex];


 const getWords = async ()=>{
    setLoad(true)
  const result=  await  getDictionaryFromApi()
  const wordsChunks = Array.from({ length: Math.ceil(result.length /testWordsLength) }, (_, i) => result.slice(i * testWordsLength, i * testWordsLength + testWordsLength))
 const index = Math.min(currentChunkIndex, wordsChunks.length - 1);
  setCurrentChunk(wordsChunks[index])
   setWords(wordsChunks)
     setLoad(false)

 }

const currentFalseWords = useMemo(() => {
  if (!currentWord) return { shuffled: [], progress: 0 };
  const slicedLength = 3
const currentWords = [...currentChunk.filter((w) => w !== currentWord).slice(0,slicedLength), currentWord]
   const shuffled=   shuffle(currentWords)
   const progress = currentWord.progress   
    return {
    progress,
    shuffled
   }
}, [ currentWord, currentChunkIndex]);


  
 

 

 return {getWords, isEmptyWords ,currentFalseWords, words}
}