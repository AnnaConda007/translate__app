 
 import {useAddWordToDictionary} from "../model/use-add-word-to-dictionary"
import { Icon } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'; 
 
interface Props {
  source:string,
  translation:string
}

  export const AddWordToDictionaryFeature = ({source,translation}:Props)=>{
const { handleSendWord} = useAddWordToDictionary()
 
  
 
    return (
   <button  className="close-delay" onClick={()=>handleSendWord({source, translation})}>
          <Icon component={AddCircleOutlineOutlinedIcon} />
  </button>
 
     )
}
 