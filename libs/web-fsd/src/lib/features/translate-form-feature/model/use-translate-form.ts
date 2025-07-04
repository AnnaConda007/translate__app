import { useState } from "react"
import { sendTextToApi } from "../api/send-text-to-api"

export const useTranslateForm = ()=>{
const [value, setValue]=useState("")
const [result, setResult] =  useState<string| null>(null)

const handleSubmit  = async(  )=>{
const result =  await sendTextToApi(value)
setResult(result)

}

    return { value, setValue,handleSubmit, result}
}