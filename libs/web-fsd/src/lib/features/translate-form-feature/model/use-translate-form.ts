import { useState } from "react"
import { sendTextToApi } from "../api/send-text-to-api"

export const useTranslateForm = ()=>{
 
const sendToApi  = async(  {sourceValue} ):Promise <string>=>{
return   await sendTextToApi(sourceValue)
 
}

    return { sendToApi}
}