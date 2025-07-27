 
import {useTranslateForm} from "../model/use-translate-form"
import { useEffect, useState } from "react";
import { AddWordToDictionaryFeature } from "../../add-word-to-dictionary-feature/ui/add-word-to-dictionary";
import { ModalPosition } from "../../reader-feature/model/useWord";
type Props = {
    value:string,
    position:ModalPosition 
};

export const AutoTranslate = ({  value, position }: Props) => {
const { sendToApi} = useTranslateForm ()
const [translated, setTranslated] = useState("")

useEffect(()=>{
   const translate = async()=>{
    const translated = await sendToApi({value});
 setTranslated(translated)
  }

  translate()
},[])

 
    return(
        <>
           <span style={{
               position: "absolute",
            left: position?.x,
            top: position?.y,
            background: "white",
            padding: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 999,
           }}>
{translated} 
<AddWordToDictionaryFeature source ={value} translation={translated} 
          />
          </span> 
           </>
    )
}