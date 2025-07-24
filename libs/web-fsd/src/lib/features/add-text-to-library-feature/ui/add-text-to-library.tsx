 
import {useAddTextToLibrary} from "../model/use-add-text-to-library.ts"
 
  export const AddTextToLibraryFeature = ()=>{
const {title,content ,setTextTitle,handleFileUpload, handleSendText} = useAddTextToLibrary()
 

  
  

    return (
  <>
        <input type="text" onChange={(e)=>setTextTitle(e.target.value)}  value={title}/>
      <input type="file" accept=".txt,.md,.docx,.html" onChange={handleFileUpload} />
      <button onClick={()=>handleSendText({title,content})}>
        отправить
      </button>
      </>
    )
}