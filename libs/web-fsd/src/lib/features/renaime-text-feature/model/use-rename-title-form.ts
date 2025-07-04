import {  useState } from "react"
  import {sendNewTitleToApi} from "../../../entities/library/api/send-new-title-name-to-api"
 
export const useRenameTitleForm = ()=>{  
 const [newTitle, setNewTitle] = useState("")
 const handleButton = async ({title, getAllTitles})=>{
     await  sendNewTitleToApi({title,newTitle})
     getAllTitles() 
    }

return {newTitle, setNewTitle, handleButton } 


}
