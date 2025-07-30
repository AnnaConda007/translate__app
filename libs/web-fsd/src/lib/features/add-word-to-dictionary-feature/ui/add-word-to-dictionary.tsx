 
 import {UseAddWordToDictionary} from "../model/use-add-word-to-dictionary"
import { Icon } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'; 
 
interface Props {
  source:string,
  translation:string
}

  export const AddWordToDictionaryFeature = ({source,translation}:Props)=>{
const { handleSendWord} = UseAddWordToDictionary()
 

  
  

    return (
   <button  className="click-animate active:scale-125 transition-transform duration-100" onClick={()=>handleSendWord({source, translation})}>
          <Icon component={AddCircleOutlineOutlinedIcon} />
  </button>
 
     )
}
 