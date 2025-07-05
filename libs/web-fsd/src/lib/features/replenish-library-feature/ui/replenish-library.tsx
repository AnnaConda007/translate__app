 
import {UseReplanishLibrary} from "../model/use-replenish-library"
import {sendTextToServer} from "../../../entities/library/api/sendTextToServer"

  export const ReplenishLibraryFeature = ()=>{
const {title,content ,setTextTitle,handleFileUpload, handleSendText} = UseReplanishLibrary()
 

  
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