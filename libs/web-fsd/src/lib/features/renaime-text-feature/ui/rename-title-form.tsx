import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
import {ButtonUi}  from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import {useRenameTitleForm} from"../model/use-rename-title-form"


export const RenameTitleForm = ({title, getAllTitles})=>{
const {newTitle, setNewTitle, handleButton } = useRenameTitleForm()

     return (
        <>
        
<InputUi value={newTitle} handleOnChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewTitle(e.target.value)}/>
<ButtonUi title="переименовать" handleButton={()=>handleButton({title, getAllTitles} )} />


         </>
    )
}
