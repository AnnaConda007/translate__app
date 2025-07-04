import { TextUi } from "../../../shared/ui-kit/ui-kit-text/ui-kit-text"
import { ButtonUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
import {useTranslateForm} from "../model/use-translate-form"

export const TranslateForm = ()=>{
const {value, setValue,handleSubmit, result} = useTranslateForm ()


    return(
        <>
        <InputUi value={value} handleOnChange={(e: React.ChangeEvent<HTMLInputElement>)=>setValue(e.target.value)}/>
        <ButtonUi title={"перевести"} handleButton={handleSubmit}/>
        <TextUi text={result}/>
        </>
    )
}