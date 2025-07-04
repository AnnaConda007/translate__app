import { useMemo, useState } from "react"
import { getAllTextTitlesFromApi } from "../../../entities/library/api/get-library-from-api"
 import { removeTitleFromDb } from "../../../entities/library/api/remove-title-name-from-db"

export const useTranslateForm = ()=>{ 
const [searchValue, setSearchValue] = useState("")
const [allTextTitles, setAllTextTitles] = useState<string[]>([""])
const [renameClicked, setRenameClicked] = useState(false)
 
const getAllTitles = async ()=>{
  const result=  await  getAllTextTitlesFromApi()
 setAllTextTitles(result)
 }

 const removeTitle = async ({title})=>{
const dd = await removeTitleFromDb({title})
console.log(dd)
  const result=  await  getAllTextTitlesFromApi()
 setAllTextTitles(result)
 }

 

const filteredTextTitles = useMemo(() => {
  const value = searchValue.toLowerCase();
  return allTextTitles.filter((title) =>
    title.toLowerCase().includes(value)
  );
}, [searchValue, allTextTitles]);

 
 

return {searchValue,setSearchValue, filteredTextTitles, setAllTextTitles, getAllTitles, renameClicked,removeTitle, setRenameClicked}


}
