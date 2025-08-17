 
 import {InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
  import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon"
 import { useLibrary } from "../model/use-library"
  import { texts } from "../../../shared/ui-texts/ui-texts"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; import DoneIcon from '@mui/icons-material/Done';
import { RemoveTextFromLibraryButton  } from "../../remove-text-from-library/ui/remove-text-from-library"

export const LibraryFeature = ()=>{
 const {searchValue, setSearchValue, renamedTitle,handleRenameTrigger,onDeleted,rollback, filteredTextTitles,handleSendNewTitleButton,handleOnChangeReName, isRenameClicked}= useLibrary()
 


    return(
        <div className="flex h-full flex-col flex-wrap   "> 
        <div className="flex items-center h-fit w-full ">   
           <InputUi  placeholder={texts.library.inputPlaceholder} value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchValue(e.target.value)}/>
           <AddCircleOutlineIcon/>
    </div>
    
    <div className="flex-grow">
{filteredTextTitles.map((t,i)=>{
   const isReadOnly =   isRenameClicked !==t
   const currentTitle = isReadOnly ? t :renamedTitle  
    return (
   <div key={t} className="  flex">
   <div  role="button"  className="flex-grow" > 
    <InputUi isTransparent={true} isReadOnly={isReadOnly} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleOnChangeReName(e.target.value)}  value={currentTitle}/>
     </div>
     { isReadOnly ?
       <ButtonIconUi Icon={DriveFileRenameOutlineIcon}     handleButton={() => handleRenameTrigger(t)} /> :
        <ButtonIconUi Icon={DoneIcon}     handleButton={() => handleSendNewTitleButton(t)} />
}
         <RemoveTextFromLibraryButton  index={i} onDelete={()=>onDeleted(t)} rollback={()=>rollback(t, i)}  titleDelete={t}/>



   </div>

)})} 
    </div>


 
         </div >
    )
}

 