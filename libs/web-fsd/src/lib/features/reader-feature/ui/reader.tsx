import { Virtuoso } from "react-virtuoso";
import { useWord } from "../model/useWord";
import { useText } from "../model/useText";
import { useParams } from "react-router-dom";
 import { WordSpan } from "./internal/word";  

export const ReaderFeature = () => {
  const { title } = useParams<{ title: string }>();
  const { onWord, selectedWord, position,setSelectedWord } = useWord();
  const {  savedParagraphId, wordsArr } = useText();
 
  const saveCurrentParagraph = (startIndex: number) => {
setSelectedWord(null)
 localStorage.setItem(`reader:${title}:paragraph`, `paragraph-${startIndex}`);
  };
 

  if(!wordsArr.length) return "load"
  return (
    <>
      <Virtuoso
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
      {selectedWord  && (
        <div
          style={{
            position: "absolute",
            left: position?.x,
            top: position?.y,
            background: "white",
            padding: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 999,
          }}
        >
          Перевод: <strong>{selectedWord}</strong>
        </div>
      )}
    </>
  );
};
