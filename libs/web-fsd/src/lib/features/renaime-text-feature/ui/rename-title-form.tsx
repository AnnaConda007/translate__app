import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
import {ButtonUi}  from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import {useRenameTitleForm} from"../model/use-rename-title-form"
import { useLibraryStore } from "../../../entities/library/model/stor"
import { getAllTextTitlesFromApi } from "../../../entities/library/api/get-library-from-api"

export const RenameTitleForm = ({title})=>{
const {newTitle, setNewTitle, handleButton } = useRenameTitleForm()
  const setTitles = useLibraryStore((state) => state.setTitles);
  
const getAllTitles = async ()=>{
  const result=  await  getAllTextTitlesFromApi()
 setTitles(result)
 }


     return (
        <>
        
<InputUi value={newTitle} handleOnChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewTitle(e.target.value)}/>
<ButtonUi title="переименовать" handleButton={()=>handleButton({title, getAllTitles} )} />


         </>
    )
}
 
