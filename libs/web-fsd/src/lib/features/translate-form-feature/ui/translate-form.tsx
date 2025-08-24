 import { InputUi } from "../../../shared/ui-kit/ui-kit-input/ui-kit-input"
 import { useState } from "react";
import { ButtonIconUi } from "../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { sendTextToApi } from "../api/send-text-to-api";
import { texts } from "../../../shared/ui-texts/ui-texts";
type Props = {
   onTranslated: (args: { source:string, translated: string }) => void;
   value:string,
   onLoad :(isLoad:boolean)=>void
   isError:(isError:boolean)=>void,
   disabled:boolean
setResult:(value:string)=>void
};

export const TranslateForm = ({setResult, onTranslated , isError,onLoad, disabled}: Props) => {
   const [source, setSource ] = useState ("");

 const handleClick = async () => {
  setResult("")
     if (!source.trim() || disabled) return;
      onLoad(true);  
    isError(false);            
    try {
      const translated = await sendTextToApi(source.trim());
      onTranslated({ source: source.trim(), translated });
    } catch (err) {
      isError(true);
      console.error(err);
    } finally {
       onLoad(false);            
    }
  };

    return(
        <div className=" w-full  flex h-fit         ">
                 <InputUi placeholder={texts.translator.inputPlaceholder} onEnterHandle={handleClick} value={source} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSource(e.target.value)}/>
              <ButtonIconUi Icon={NavigateNextIcon} handleButton={()=>handleClick()}/>

 
         </div>
    )
}