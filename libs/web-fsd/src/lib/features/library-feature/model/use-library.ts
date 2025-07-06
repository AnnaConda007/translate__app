import { useMemo, useState } from "react"
import { getAllTextTitlesFromApi } from "../../../entities/library/api/get-library-from-api"
import { useLibraryStore } from "../../../entities/library/model/stor";

export const useLibrary = ()=>{ 
   const setTitles = useLibraryStore((state) => state.setTitles);
      const titles = useLibraryStore((state) => state.titles);

   
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

 
 

return {searchValue,setSearchValue, filteredTextTitles, getAllTitles, renameClicked, setRenameClicked}


}
