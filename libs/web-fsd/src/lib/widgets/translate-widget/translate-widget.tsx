 import {TranslateForm} from "../../features/translate-form-feature/ui/translate-form"
import {AddWordToDictionaryFeature} from "../../features/add-word-to-dictionary-feature/ui/add-word-to-dictionary"
import { useState } from "react";
 
 import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
 

export const TranslateWidget = ( ) => {
  const [source, setSource ] = useState ("");
  const [result, setResult] = useState( "");
  const [IsTranslatedVisible, setIsTranslatedVisible] = useState(false)
 
const onTranslated = ({source,  translated  }: {source:string, translated : string }) => {
  const word =  translated
  setResult(word );
  setSource(source)
setIsTranslatedVisible(true)
};

 


    return(
        <div className={`   h-full w-full bg-cyan-100 `}>
          <div className="container m-auto h-full ">
<div className=" h-1/3 flex items-end" >
  <TranslateForm onTranslated={onTranslated} value={source} />
</div>
  {IsTranslatedVisible && (  <div className="flex justify-between mt-2">
{  <SimpleBar className="  h-1/3 w-2/3 ">
<span className="break-words">   {result}
</span>

</SimpleBar>}
           <AddWordToDictionaryFeature    source={source} translation={result} />
  </div>)}




 

          </div>
     
        </div>
    )
}



//       
