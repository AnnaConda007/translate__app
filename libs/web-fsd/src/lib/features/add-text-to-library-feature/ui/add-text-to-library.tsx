 
import {useAddTextToLibrary} from "../model/use-add-text-to-library.ts"
import {sendTextToServer} from "../../../entities/library/api/sendTextToServer"

  export const AddTextToLibraryFeature = ()=>{
const {title,content ,setTextTitle,handleFileUpload, handleSendText} = useAddTextToLibrary()
 

  
 //вынести кнопки в отдельные фичи
 

    return (
  <>
        <input type="text" onChange={(e)=>setTextTitle(e.target.value)}  value={title}/>
      <input type="file" accept=".txt,.md,.docx" onChange={handleFileUpload} />
      <button onClick={()=>handleSendText({title,content})}>
        отправить
      </button>
      </>
    )
}