 
  import {ButtonUi} from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
 import { useRemoveWordFromDictionary } from "../model/use-remove-word-from-dictionary"

   export const RemoveWordFromDictionaryFeature = ({wordToDeleted})=>{
 const { removeWord}= useRemoveWordFromDictionary()
 
 
    return(
               <ButtonUi title={"удалить"} handleButton={()=>removeWord({source:wordToDeleted })} />

    )
}

 