import { TextUi } from "../../../shared/ui-kit/ui-kit-text/ui-kit-text"
import { ButtonUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
import {useTranslateForm} from "../model/use-translate-form"

type Props = {
   onTranslated: (args: { translated: string }) => void;
   value:string
};

export const TranslateForm = ({ onTranslated, value }: Props) => {
const { sendToApi} = useTranslateForm ()

  const handleClick = async (value) => {
    const translated = await sendToApi({value});
    onTranslated({translated}); 
  };

    return(
        <>
        <ButtonUi title={"перевести"} handleButton={()=>handleClick(value)}/>
         </>
    )
}