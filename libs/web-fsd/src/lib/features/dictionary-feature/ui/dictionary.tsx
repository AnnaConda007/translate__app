 
 import {InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
 import {ButtonUi} from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
 import { useDictionary } from "../model/use-dictionary"
import { useEffect } from "react"  
  export const DictionaryFeature = ()=>{
 const {searchValue,setSearchValue, filteredTextTitles, getDictionary,removeWord}= useDictionary()
 
 useEffect(()=>{
    getDictionary()

 },[])

    return(
        <> search
         <InputUi value={searchValue} handleOnChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchValue(e.target.value)}/>
{filteredTextTitles.map((word)=>(
   <div key={word.source}>
     <div >     {word.source }  - {word.translation} 
           <ButtonUi title={"удалить"} handleButton={()=>removeWord({source:word.source })} />
      
   </div>

    </div>

))} 
 
         </>
    )
}

 