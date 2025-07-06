 
  import {ButtonUi} from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
 import { useRemoveTextFromLibrary } from "../model/remove-text-from-library"
  
 export const RemoveTextFromLibraryButton = ({title})=>{
 const {removeTitle}= useRemoveTextFromLibrary()
 
 
    return(
        <> 
          
    
       <ButtonUi title={"удалить"} handleButton={()=>removeTitle({title})} />

 
 
         </>
    )
}

 