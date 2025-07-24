import { useMemo, useState } from "react"
import { getAllTextTitlesFromApi } from "../../../entities/library/api/get-library-from-api"
import { useLibraryStore } from "../../../entities/library/model/stor";
import { useNavigate } from "react-router-dom";

export const useLibrary = ()=>{ 
   const setTitles = useLibraryStore((state) => state.setTitles);
      const titles = useLibraryStore((state) => state.titles);
const navigate = useNavigate()

const handleClickByTitle = (title:string)=>{
  navigate(`/read/${title}`)
}
   
const [searchValue, setSearchValue] = useState("")
 const [renameClicked, setRenameClicked] = useState(false)
 
const getAllTitles = async ()=>{
  const result=  await  getAllTextTitlesFromApi()
 setTitles(result)
 }

 
const filteredTextTitles = useMemo(() => {
  const value = searchValue.toLowerCase();
  return titles.filter((title) =>
    title.toLowerCase().includes(value)
  );
}, [searchValue, titles]);

 
 

return {searchValue,setSearchValue,handleClickByTitle, filteredTextTitles, getAllTitles, renameClicked, setRenameClicked, }


}
