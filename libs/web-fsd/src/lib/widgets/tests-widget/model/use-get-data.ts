 import { useCallback, useMemo } from "react"
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
     currentWord:IDictionary
    

}

export const useGetData = ({setCurrentChunk,setWords,currentWord, setLoad,words,currentChunk,currentChunkIndex} :Props)=>{ 
 
  
  const testWordsLength = 10
const isEmptyWords = () => (words[0]?.length ?? 0) <testWordsLength ;
 

const getWords = useCallback(async () => {
  setLoad(true);
  try {
    const result = await getDictionaryFromApi();
    const wordsChunks = Array.from(
      { length: Math.ceil(result.length / testWordsLength) },
      (_, i) => result.slice(i * testWordsLength, i * testWordsLength + testWordsLength)
    );
    setCurrentChunk(wordsChunks[currentChunkIndex]);
    setWords(wordsChunks);
  } finally {
    setLoad(false);
  }
}, [currentChunkIndex, testWordsLength, setWords, setCurrentChunk]);

 

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
}, [ currentWord,currentChunk ]);


  
 

 

 return {getWords, isEmptyWords ,currentFalseWords, words}
}