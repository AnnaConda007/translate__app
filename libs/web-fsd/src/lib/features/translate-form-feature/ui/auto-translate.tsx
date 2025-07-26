 
import {useTranslateForm} from "../model/use-translate-form"
import { useEffect, useState } from "react";
import { AddWordToDictionaryFeature } from "../../add-word-to-dictionary-feature/ui/add-word-to-dictionary";

type Props = {
    value:string
};

export const AutoTranslate = ({  value }: Props) => {
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
           <span>
{translated} 
          </span> <AddWordToDictionaryFeature source ={value} translation={translated} />
           </>
    )
}