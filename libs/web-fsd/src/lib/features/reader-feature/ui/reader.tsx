 import { Virtuoso } from "react-virtuoso";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {   useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AutoTranslate } from "../../translate-form-feature/ui/auto-translate";
import { useWord } from "../model/useWord";
import { useText } from "../model/useText";
import { WordSpan } from "./internal/word";
 
export const ReaderFeature = () => {
  const { selectedWord, position, setSelectedWord } = useWord();
  const { savedParagraphId, wordsArr, saveCurrentParagraph } = useText(setSelectedWord);
  const { title } = useParams<{ title: string }>();

   const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null);

 

  if (!wordsArr?.length) return "load";
   return (
<div  
className=" container mx-auto flex-grow overflow-hidden   "> 
         <SimpleBar
       className="h-full"
        scrollableNodeProps={{ ref: setScrollParent }}
      >
      
                {scrollParent && (
          <Virtuoso
className="h-full"            key={title}
            totalCount={wordsArr.length}
            initialTopMostItemIndex={savedParagraphId}
            customScrollParent={scrollParent}
            rangeChanged={({ startIndex }) => saveCurrentParagraph(startIndex)}
              itemContent={(index) => {
              const words = wordsArr[index];
              return (
                <p id={`paragraph-${index}`} className="py-2 leading-5">
                  {words.map((word, j) => (
                    <WordSpan key={`${index}-${j}`} word={word}  />
                  ))}
                </p>
              );
            }}
          />
        )}
  

      </SimpleBar>
                  {selectedWord  && position  &&(
             <AutoTranslate value={selectedWord} position={position} />
         )}
    </div>
  );
};
