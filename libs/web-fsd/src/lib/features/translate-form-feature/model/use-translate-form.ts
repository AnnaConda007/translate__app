import { useState } from "react"
import { sendTextToApi } from "../api/send-text-to-api"

export const useTranslateForm = ()=>{
 
const sendToApi  = async(  {value} ):Promise <string>=>{
return   await sendTextToApi(value)
 
}

    return { sendToApi}
}