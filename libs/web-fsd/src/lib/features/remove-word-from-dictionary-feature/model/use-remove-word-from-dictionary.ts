 import { getDictionaryFromApi } from "../../../entities/dictionary-entities/api/get-dictionary";
import {  useDictionaryStore } from "../../../entities/dictionary-entities/model/stor";
import { removeWordFromDictionary } from "../../../entities/dictionary-entities/api/remove-word-from-dictioanary";
import { vibrate } from "../../../shared/utils/vibrate"
import { useAudio } from "../../../shared/audio/models/use-audio-for-test";
 


 export const useRemoveWordFromDictionary = ()=>{ 
        const {deleteAudio, toPlayAudio} =useAudio()

const setDictionary = useDictionaryStore((state) => state.setDictionary);

 const removeWordAndGetUpdatedDictionary = async ({source}:{source:string})=>{
   toPlayAudio(deleteAudio.current)

 await removeWordFromDictionary({source})
   const result=  await  getDictionaryFromApi()
 setDictionary(result)
 vibrate()
  }

 
 
 

return {removeWordAndGetUpdatedDictionary}
}