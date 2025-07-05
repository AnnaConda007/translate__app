 
 import {UseAddWordToDictionary} from "../model/use-add-word-to-dictionary"

 import {InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
 import {ButtonUi} from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import React from "react"

  export const AddWordToDictionaryFeature = ()=>{
const { source,setSource, translation,setTranslation, handleSendWord} = UseAddWordToDictionary()
 

  
  

    return (
  <>
        <InputUi value={source} handleOnChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSource(e.target.value)}/>
                <InputUi value={translation} handleOnChange={(e:React.ChangeEvent<HTMLInputElement>)=>    setTranslation(e.target.value)
}/>
                <ButtonUi title={"добавить в словарь"} handleButton={()=>handleSendWord({source, translation})}/>

      </>
    )
}
 