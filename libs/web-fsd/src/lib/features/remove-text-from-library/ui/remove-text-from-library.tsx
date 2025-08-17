 
  import { useRemoveTextFromLibrary } from "../model/remove-text-from-library"
 import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import DeleteIcon from '@mui/icons-material/Delete';
 interface Props {
  titleDelete:string,
  onDelete?:((title:string)=>void)
  rollback?:((title:string, index:number)=>void)
  index:number
}

 export const RemoveTextFromLibraryButton = ({titleDelete, onDelete, index, rollback,}:Props)=>{
 const {removeTitle}= useRemoveTextFromLibrary()
 
 

 const handleButton = async () => {
 
   onDelete?.(titleDelete);

  try {
     await removeTitle({ title: titleDelete });
 
  } catch (e) {
    console.error("Ошибка удаления из библиотеки:", e);
     rollback?.(titleDelete, index);
  }
};



    return(
        <> 
          
    
       <ButtonIconUi Icon={DeleteIcon} handleButton={handleButton} />

 
 
         </>
    )
}

 