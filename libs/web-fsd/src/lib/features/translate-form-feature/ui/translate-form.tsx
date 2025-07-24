import { TextUi } from "../../../shared/ui-kit/ui-kit-text/ui-kit-text"
import { ButtonUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
import {useTranslateForm} from "../model/use-translate-form"
import { useState } from "react";

type Props = {
   onTranslated: (args: { source:string, translated: string }) => void;
   value:string
};

export const TranslateForm = ({ onTranslated }: Props) => {
const { sendToApi} = useTranslateForm ()
  const [source, setSource ] = useState ("");

  const handleClick = async ( ) => {
    const translated = await sendToApi({source});
     onTranslated({source,translated}); 
  };

    return(
        <>
                <InputUi value={source} handleOnChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSource(e.target.value)}/>

        <ButtonUi title={"перевести"} handleButton={()=>handleClick()}/>
         </>
    )
}