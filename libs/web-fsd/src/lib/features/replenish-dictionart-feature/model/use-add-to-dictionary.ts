import { useState } from "react";
import { auth } from "../../../shared/config/firebase-сonfig";
import { useLibraryStore } from "../../../entities/library/model/stor";
import { getAllTextTitlesFromApi } from "../../../entities/library/api/get-library-from-api";
import {sendTextToServer} from "../../../entities/library/api/sendTextToServer"
import { useDictionaryStore } from "../../../entities/dictionary-entities/model/stor";
import { addWordToDictionary } from "../../../entities/dictionary-entities/api/add-word-to-dictionary";
import { getDictionaryFromApi } from "../../../entities/dictionary-entities/api/get-dictionary";

 
export const UseAddToDictionary = ()=>{

const [source,setSource] = useState("")
const [translation,setTranslation] = useState("")

const setDictionary = useDictionaryStore((state) => state.setDictionary);


 const handleSendWord =   async ({source,translation})=>{
  await addWordToDictionary(source,translation)
  const result =await getDictionaryFromApi()
  setDictionary(result )

 }


 
 
 return {
   source,setSource, translation,setTranslation, handleSendWord
 }
}