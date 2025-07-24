import { useEffect, useState } from "react";
import { getTextByTitleFromApi } from "../../../entities/library/api/get-text-by-title-from-api";
 import { useParams } from "react-router-dom";
import { AutoTranslate } from "../../translate-form-feature/ui/auto-translate";
 interface ModalPosition {
  x: number;
  y: number;
}

export const ReaderFeature = () => {
  const { title } = useParams<{ title: string }>();
  const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState<number>();

  const [selectedWord, setSelectedWord] = useState<string | null>(null);

const [position,setPosition] = useState<ModalPosition >()
  useEffect(() => {
    const fetchText = async () => {
      if (!title) return;
      const plainText = await getTextByTitleFromApi(title);  
      setText(plainText);
    };

    fetchText();
  }, [title]);

   const paragraphs = text.split(/\n\s*\n/);

const handleClickWord = ( i:number,word:string, event: React.MouseEvent<HTMLSpanElement>)=>{
  const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.bottom + window.scrollY;
     setPosition({ x, y });
     setSelectedWord(word)
     setWordIndex(i)
    }

  return (
    <div  >
      {paragraphs.map((para, i) => {
         const words = para.split(/(\s+)/);

        return (
          <p key={i} >
            {words.map((word, j) =>
              /\s+/.test(word) ? (
                word
             ) : (
                <span
                  key={j}
                  onClick={(e) => handleClickWord(j,word, e)}
                   
                >
                  {word}
                  { wordIndex==j && selectedWord==word && <AutoTranslate value={word}/>
}
                </span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
};
