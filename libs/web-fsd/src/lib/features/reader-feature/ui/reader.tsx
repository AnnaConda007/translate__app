import { Virtuoso } from "react-virtuoso";
import { useWord } from "../model/useWord";
import { useText } from "../model/useText";
import { WordSpan } from "./internal/word";  
import {AutoTranslate} from "../../translate-form-feature/ui/auto-translate"
import { useParams } from "react-router-dom";

export const ReaderFeature = () => {
 const { onWord, selectedWord, position,setSelectedWord } = useWord();
const {  savedParagraphId, wordsArr, saveCurrentParagraph } = useText(setSelectedWord);
 const { title } = useParams<{ title: string }>();

  if(!wordsArr?.length) return "load"
  return (
    <>
 
      <Virtuoso
      key={title}
         style={{ height: "100vh" }}
         totalCount={wordsArr.length}
        initialTopMostItemIndex={ savedParagraphId}
        rangeChanged={({ startIndex }) => saveCurrentParagraph(startIndex)}
         itemContent={(index) => {
          const words = wordsArr[index];
          return (
            <p id={`paragraph-${index}`} style={{ padding: "8px 16px", lineHeight: "1.6" }}>
              {words.map((word, j) => (
                <WordSpan key={`${index}-${j}`} word={word} onClick={onWord} />
              ))}
            </p>
          );
        }}
      />
      {selectedWord  && position &&  (
                 <AutoTranslate value={selectedWord} position={position} />

      )}
    </>
  );
};
