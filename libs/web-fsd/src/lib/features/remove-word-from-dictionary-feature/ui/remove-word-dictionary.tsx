 
  import { useRemoveWordFromDictionary } from "../model/use-remove-word-from-dictionary"
import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import DeleteIcon from '@mui/icons-material/Delete';
import { ITestResultUI } from "../../../entities/test-entities/types/test-types";
 
interface Props {
  wordToDelete:ITestResultUI,
  onDelete?:((word:string)=>void)
  rollback?:((word:ITestResultUI, index:number)=>void)
  index?:number
}
   export const RemoveWordFromDictionaryFeature = ({wordToDelete, onDelete, index, rollback}:Props)=>{
 
 const { removeWordAndGetUpdatedDictionary}= useRemoveWordFromDictionary()
 
const handleButton = async () => {
   onDelete?.(wordToDelete.source);

  try {
     await removeWordAndGetUpdatedDictionary({ source: wordToDelete.source });
 
  } catch (e) {
    console.error("Ошибка удаления из словаря:", e);
    if(index)
    rollback?.(wordToDelete, index);
  }
};


    return(
      <ButtonIconUi Icon={DeleteIcon} handleButton={ handleButton } />
 
    )
}

 