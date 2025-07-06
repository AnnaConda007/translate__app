 import { getDictionaryFromApi } from "../../../entities/dictionary-entities/api/get-dictionary";
import { useDictionaryStore } from "../../../entities/dictionary-entities/model/stor";
import { removeWordFromDictionary } from "../../../entities/dictionary-entities/api/remove-word-from-dictioanary";

 export const useRemoveWordFromDictionary = ()=>{ 
       const setDictionary = useDictionaryStore((state) => state.setDictionary);

 
 
 const removeWord = async ({source})=>{
 await removeWordFromDictionary({source})
   const result=  await  getDictionaryFromApi()
 setDictionary(result)
 }

 
 
 

return {removeWord}
}