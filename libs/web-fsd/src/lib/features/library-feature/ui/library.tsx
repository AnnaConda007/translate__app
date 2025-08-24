 
 import {InputStatus, InputUi} from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
  import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon"
 import { useLibrary } from "../model/use-library"
  import { texts } from "../../../shared/ui-texts/ui-texts"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; import DoneIcon from '@mui/icons-material/Done';
import { RemoveTextFromLibraryButton  } from "../../remove-text-from-library/ui/remove-text-from-library"
import { SkeletonUi } from "../../../shared/ui-kit/ui-kit-skeletons/ui-kit-test-skeleton";
 
export const LibraryFeature = ()=>{
 const {searchValue,error,load,setSearchValue, renamedTitle,handleRenameTrigger,onDeleted,rollback, filteredTextTitles,handleSendNewTitleButton,handleOnChangeReName, isRenameClicked, handleClickByTitle}= useLibrary()
 



 
return  (        <div className="flex h-full flex-col  gap-2 flex-wrap   "> 
        <div className="flex items-center h-fit w-full ">   
           <InputUi  placeholder={texts.library.inputPlaceholder} value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearchValue(e.target.value)}/>
           <AddCircleOutlineIcon/>
    </div>
    
    <div className="flex-grow">
  
      {error && "error"}


          {load &&  < SkeletonUi testItemsAmount={3}/>}

{filteredTextTitles.map((t,i)=>{
   const isReadOnly =   isRenameClicked !==t
    const currentTitle = isReadOnly ? t :renamedTitle  
    return (
   <div key={t} className="  flex">
   <div  role="button"  className="flex-grow flex" onClick={()=>handleClickByTitle({  isRenaming:!isReadOnly})}  > 
    <div className="flex-grow">
          <InputUi  status={error ? InputStatus.Error :InputStatus.None} isTransparent={isReadOnly}  isReadOnly={isReadOnly} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleOnChangeReName(e.target.value)}  value={currentTitle}/>
    </div>
    </div>
     { isReadOnly ?
       <ButtonIconUi Icon={DriveFileRenameOutlineIcon}     handleButton={() => handleRenameTrigger(t)} /> :
        <ButtonIconUi Icon={DoneIcon}     handleButton={() => handleSendNewTitleButton(t, i)} />
}
         <RemoveTextFromLibraryButton  index={i} onDelete={()=>onDeleted(t)} rollback={()=>rollback(t, i)}  titleDelete={t}/>



   </div>

)})} 
    </div>


 
         </div >)   
 
}

 