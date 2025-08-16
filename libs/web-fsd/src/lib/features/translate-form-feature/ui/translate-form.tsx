import { TextUi } from "../../../shared/ui-kit/ui-kit-text/ui-kit-text"
import { ButtonUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button"
import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
import {useTranslateForm} from "../model/use-translate-form"
import { useState } from "react";
import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
type Props = {
   onTranslated: (args: { source:string, translated: string }) => void;
   value:string
};

export const TranslateForm = ({ onTranslated }: Props) => {
const { sendToApi} = useTranslateForm ()
  const [source, setSource ] = useState ("");

  const handleClick = async ( ) => {
    const translated = await sendToApi({sourceValue:source});
     onTranslated({source,translated}); 
  };

    return(
        <div className=" w-full  flex h-fit         ">
                 <InputUi  value={source} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSource(e.target.value)}/>
              <ButtonIconUi Icon={NavigateNextIcon} handleButton={()=>handleClick()}/>

 
         </div>
    )
}