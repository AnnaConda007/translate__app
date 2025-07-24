import {TranslateForm} from "../../features/translate-form-feature/ui/translate-form"
import {AddWordToDictionaryFeature} from "../../features/add-word-to-dictionary-feature/ui/add-word-to-dictionary"
import { useState } from "react";
import { InputUi } from "../../shared/ui-kit/ui-kit-input/ui-kit-input";

 
export const TranslateWidget = ( ) => {
  const [source, setSource ] = useState ("");
  const [result, setResult] = useState( "");

const onTranslated = ({source,  translated  }: {source:string, translated : string }) => {
  const word =  translated
  setResult(word );
  setSource(source)
};


    return(
        <>
       <TranslateForm onTranslated={onTranslated} value={source} />
      <span>{result}</span>
        <AddWordToDictionaryFeature source={source} translation={result} />
        </>
    )
}