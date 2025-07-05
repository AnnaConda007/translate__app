 
 import {InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
 import {ButtonUi} from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
 import { useTranslateForm } from "../model/use-library"
import { useEffect } from "react" 
import {RenameTitleForm} from "../../renaime-text-feature/ui/rename-title-form"
 import {ReplenishLibraryFeature} from "../../replenish-library-feature/ui/replenish-library"
import { useLibraryStore } from "../../../entities/library/model/stor"

 export const LibraryFeature = ()=>{
 const {searchValue, setSearchValue, filteredTextTitles, getAllTitles, renameClicked, removeTitle,setRenameClicked}= useTranslateForm()
 
 useEffect(()=>{
    getAllTitles()

 },[])

    return(
        <> 
        <ReplenishLibraryFeature/>
        ------------------------------------
        <InputUi value={searchValue} handleOnChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchValue(e.target.value)}/>
{filteredTextTitles.map((title)=>(
   <div key={title}>
     <div >     {title } 
        <ButtonUi title={"переименовать"} handleButton={setRenameClicked} />
       <ButtonUi title={"удалить"} handleButton={()=>removeTitle({title})} /></div>

        {renameClicked && <RenameTitleForm  title={title}  getAllTitles={getAllTitles} />}
   </div>

))} 
 
         </>
    )
}

 