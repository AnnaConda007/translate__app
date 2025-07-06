 
 import {InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
  import { useDictionary } from "../model/use-dictionary"
 import {RemoveWordFromDictionaryFeature} from "../../remove-word-from-dictionary-feature/ui/remove-word-dictionary"
import { useEffect } from "react"  

  export const DictionaryFeature = ()=>{
 const {searchValue,setSearchValue, filteredTextTitles, getDictionary}= useDictionary()
 
 useEffect(()=>{
    getDictionary()

 },[])

    return(
        <> search
         <InputUi value={searchValue} handleOnChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchValue(e.target.value)}/>
{filteredTextTitles.map((word)=>(
   <div key={word.source}>
     <div >     {word.source }  - {word.translation} 
      <RemoveWordFromDictionaryFeature wordToDeleted={word.source}/>
       
   </div>

    </div>

))} 
 
         </>
    )
}

 