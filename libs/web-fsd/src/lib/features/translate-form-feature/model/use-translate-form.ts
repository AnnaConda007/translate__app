import { useState } from "react"
import { sendTextToApi } from "../api/send-text-to-api"

export const useTranslateForm = ()=>{
 
const sendToApi  = async(  {source} ):Promise <string>=>{
return   await sendTextToApi(source)
 
}

    return { sendToApi}
}