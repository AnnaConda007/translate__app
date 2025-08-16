 
  import { useRemoveWordFromDictionary } from "../model/use-remove-word-from-dictionary"
import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import DeleteIcon from '@mui/icons-material/Delete';
 
type Word = { source: string };


interface Props <T extends Word>{
  wordToDelete:T,
  onDelete?:((word:string)=>void)
  rollback?:((word:T, index:number)=>void)
  index:number
}
export const RemoveWordFromDictionaryFeature = <T extends Word,>({ wordToDelete, onDelete, index, rollback,}: Props<T>)=>{
 
 const { removeWordAndGetUpdatedDictionary}= useRemoveWordFromDictionary()
 
const handleButton = async () => {
   onDelete?.(wordToDelete.source);

  try {
     await removeWordAndGetUpdatedDictionary({ source: wordToDelete.source });
 
  } catch (e) {
    console.error("Ошибка удаления из словаря:", e);
     rollback?.(wordToDelete, index);
  }
};


    return(
      <ButtonIconUi Icon={DeleteIcon} handleButton={ handleButton } />
 
    )
}

 