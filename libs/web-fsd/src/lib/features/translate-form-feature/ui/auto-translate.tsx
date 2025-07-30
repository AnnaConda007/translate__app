 
import {useTranslateForm} from "../model/use-translate-form"
import { useEffect, useState } from "react";
import { AddWordToDictionaryFeature } from "../../add-word-to-dictionary-feature/ui/add-word-to-dictionary";
import { ModalPosition } from "../../reader-feature/model/useWord";

import React from "react";
type Props = {
    value:string,
    position:ModalPosition 
};

export const AutoTranslate = React.memo(({ value, position }: Props) => {
const { sendToApi} = useTranslateForm ()
const [translated, setTranslated] = useState("")

  
 useEffect(()=>{
   const translate = async()=>{
    const sourceValue = value.toLowerCase().replace(/[^a-zа-яё]/gi, "")
    const translated = await sendToApi({sourceValue});
 setTranslated(translated)
  }

  translate()

   return () => {
    setTranslated("");
  };
},[value])

 if (!translated) return null

    return(
 <div className="no-close-on-click w-60 p-2 bg-yellow-100 shadow-md absolute flex justify-between"
            style={{
             left: position?.x,
            top: position?.y,
            }}>
<p className="no-close-on-click p-2">{translated} 
</p>
<AddWordToDictionaryFeature source ={value} translation={translated} 
          />
          </div> 
     )
})