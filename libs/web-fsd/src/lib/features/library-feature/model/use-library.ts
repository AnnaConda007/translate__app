import {  useEffect, useMemo, useState } from "react"
import { getAllTextTitlesFromApi } from "../../../entities/library/api/get-library-from-api"
import { useLibraryStore } from "../../../entities/library/model/stor";
import { useNavigate } from "react-router-dom";
import { NawPathEnum } from "../../../shared/ui-kit/ui-kit-nav/ui-kit-naw";
import { sendNewTitleToApi } from "../../../entities/library/api/send-new-title-name-to-api";
import { deleteItem, rollbackWord } from "../../../shared/utils/list-utils";
export const useLibrary = ()=>{ 
  const navigate = useNavigate()
   const setTitles = useLibraryStore((state) => state.setTitles);
     const titles = useLibraryStore((state) => state.titles);
const [renamedTitle, setRenamedTitle] = useState <string>("")
const [searchValue, setSearchValue] = useState("")
 const [isRenameClicked, setIsRenameClicked] = useState<null | string>(null)
 

  useEffect(()=>{
    getAllTitles()

 },[])

  const onDeleted = (title:string)=>{
   const updatedTitles = deleteItem(titles,   title);
 setTitles(updatedTitles)
 }
 
const rollback = (title: string, index: number) => {
  const current = useLibraryStore.getState().titles;  
  setTitles(rollbackWord(current, title, index));
};

 const handleClickByTitle = (title:string)=>{
  navigate(`${NawPathEnum}/${title}`)
}

const handleRenameTrigger = (title:string)=>{
setIsRenameClicked(title)
setRenamedTitle(title)
}

const handleOnChangeReName = (title:string)=>{
  setRenamedTitle(title)
 }

const handleSendNewTitleButton = async ( title:string)=>{
           await  sendNewTitleToApi({title,newTitle:renamedTitle})
           setIsRenameClicked(null)
         getAllTitles() 
        }
  

const getAllTitles = async ()=>{
  const result=  await  getAllTextTitlesFromApi()
  const sorted = result.sort((a, b) => a.localeCompare(b));

   setTitles(sorted)
 }

 
const filteredTextTitles = useMemo(() => {
  const value = searchValue.toLowerCase();
  return titles.filter((title) =>
    title.toLowerCase().includes(value)
  );
}, [searchValue, titles]);

 
 

return {searchValue,onDeleted, rollback,renamedTitle,handleRenameTrigger,setSearchValue,handleClickByTitle, handleOnChangeReName,handleSendNewTitleButton,filteredTextTitles, getAllTitles, isRenameClicked, setIsRenameClicked, }


}
