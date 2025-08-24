import {  useCallback, useEffect, useMemo, useRef, useState } from "react"
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
 const [error, setError] =  useState(false)
 const [load, setLoad] =  useState(false)
 

  const onDeleted = (title:string)=>{
   const updatedTitles = deleteItem(titles,   title);
 setTitles(updatedTitles)
 }
 
const rollback = (title: string, index: number) => {
  const current = useLibraryStore.getState().titles;  
  setTitles(rollbackWord(current, title, index));
};

 const handleClickByTitle = ( {isRenaming}:{ isRenaming:boolean})=>{
  if(isRenaming) return
  const currentText = localStorage.getItem("current-text")
   navigate(`${NawPathEnum.CURRENT_TEXT}/${currentText}`)
}

const handleRenameTrigger = (title:string)=>{
setIsRenameClicked(title)
setRenamedTitle(title)
}

const handleOnChangeReName = (title:string)=>{
  setRenamedTitle(title)
 }

const handleSendNewTitleButton = async ( title:string, index:number)=>{
   try {
     await  sendNewTitleToApi({title,newTitle:renamedTitle})
   await    getAllTitles() 
      const currentReadingText =localStorage.getItem("current-text")
    if(currentReadingText === title){
localStorage.setItem("current-text",renamedTitle )
           }
       setIsRenameClicked(null)
  } catch (error) {
    if(error instanceof Error) {
      console.error("Ошибка при переименовании текста")
const oldTitles = titles.map((t, i) => (i === index ? title : t));
setTitles(oldTitles)
           setError(true)
 
setTimeout(() =>           {            
             setIsRenameClicked(null)
                         setError(false)
}
             
, 350);
 

    }
  }
  
          
        }
  

const getAllTitles = useCallback(async () => {
  setError(false);
   try {

 if(!titles.length){
      setLoad(true)

}
    const result = await getAllTextTitlesFromApi();
    const sorted = [...result].sort((a, b) => a.localeCompare(b));
    setTitles(sorted);
  } catch (e) {
    console.error(
      "Ошибка при получении библиотеки:",
      e instanceof Error ? e.message : e
    );
    setError(true);
  } finally {
     setLoad(false);
  }
}, [setTitles]);

 
const filteredTextTitles = useMemo(() => {
  const value = searchValue.toLowerCase();
  return titles.filter((title) =>
    title.toLowerCase().includes(value)
  );
}, [searchValue, titles]);

 
 
   useEffect(()=>{
    getAllTitles()

 },[getAllTitles])


 
 


return {searchValue,error,onDeleted, load,rollback,renamedTitle,handleRenameTrigger,setSearchValue,handleClickByTitle, handleOnChangeReName,handleSendNewTitleButton,filteredTextTitles, getAllTitles, isRenameClicked, setIsRenameClicked, }


}
