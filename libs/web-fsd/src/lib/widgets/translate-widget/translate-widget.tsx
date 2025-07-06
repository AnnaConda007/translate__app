import {TranslateForm} from "../../features/translate-form-feature/ui/translate-form"
import {AddWordToDictionaryFeature} from "../../features/add-word-to-dictionary-feature/ui/add-word-to-dictionary"
import { useState } from "react";
import { InputUi } from "../../shared/ui-kit/ui-kit-input/ui-kit-input";

export const TranslateWidget = ()=>{
  const [source, setSource ] = useState ("");
  const [result, setResult] = useState( "");

const onTranslated = ({ translated  }: { translated : string }) => {
  setResult(translated );
};


    return(
        <>
        <InputUi value={source} handleOnChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSource(e.target.value)}/>
      <TranslateForm onTranslated={onTranslated} value={source} />
      <span>{result}</span>
        <AddWordToDictionaryFeature source={source} translation={result} />
        </>
    )
}