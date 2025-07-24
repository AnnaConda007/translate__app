 
 import {InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
 import {ButtonUi} from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
 import { useLibrary } from "../model/use-library"
import { useEffect } from "react" 
import {RenameTitleForm} from "../../renaime-text-feature/ui/rename-title-form" 
import { RemoveTextFromLibraryButton  } from "../../remove-text-from-library/ui/remove-text-from-library"

 export const LibraryFeature = ()=>{
 const {searchValue, setSearchValue, handleClickByTitle,filteredTextTitles, getAllTitles, renameClicked,setRenameClicked}= useLibrary()
 
 useEffect(()=>{
    getAllTitles()

 },[])

    return(
        <> 
        <span>поиск</span>  
        <InputUi value={searchValue} handleOnChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchValue(e.target.value)}/>
{filteredTextTitles.map((title)=>(
   <div key={title} role="button" onClick={()=>handleClickByTitle(title)}>
     <div >     {title } 
        <ButtonUi title={"переименовать"} handleButton={setRenameClicked} />
        <RemoveTextFromLibraryButton  title={title}/>
          
       </div>

        {renameClicked && <RenameTitleForm  title={title}   />}
   </div>

))} 
 
         </>
    )
}

 