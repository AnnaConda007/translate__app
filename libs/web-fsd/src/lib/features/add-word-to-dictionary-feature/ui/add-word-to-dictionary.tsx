 
 import {UseAddWordToDictionary} from "../model/use-add-word-to-dictionary"

 import {InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
 import {ButtonUi} from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import React from "react"

  export const AddWordToDictionaryFeature = ({source,translation})=>{
const { handleSendWord} = UseAddWordToDictionary()
 

  
  

    return (
  <>
         
                <ButtonUi title={"добавить в словарь"} handleButton={()=>handleSendWord({source, translation})}/>

      </>
    )
}
 