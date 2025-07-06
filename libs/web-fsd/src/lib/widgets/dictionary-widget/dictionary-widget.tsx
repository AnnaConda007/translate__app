 
import { useState } from "react";
import { DictionaryFeature } from "../../features/dictionary-feature/ui/dictionary";
import { ButtonUi } from "../../shared/ui-kit/ui-kit-button/ui-kit-button";
import {TranslateWidget} from "../translate-widget/translate-widget"
export const DictionaryWidget = ()=>{ 
const [clicked, setClicked] = useState(false)
    return (
        <>
        <ButtonUi title={"Добавить новое слово"} handleButton={()=>setClicked(true)}/> 
 {clicked && <TranslateWidget/> }
 <DictionaryFeature/>
</>
    )
}