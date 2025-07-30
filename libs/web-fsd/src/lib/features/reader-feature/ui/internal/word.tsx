 import { memo } from "react";

interface ModalPosition {
  x: number;
  y: number;
}

interface Props {
  word: string;
  onClick: (params: { selectedWord: string | null; position: ModalPosition }) => void;
}

export const WordSpan = memo(({ word, onClick }: Props) => {
  if (!word.trim()) return <span>{word}</span>; 

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onClick({
      selectedWord: word,
      position: { x: rect.left + window.scrollX, y: rect.bottom + window.scrollY },
    });
  };

  return (
    <span  className="no-close-on-click" onClick={handleClick} style={{ whiteSpace: "pre-wrap", cursor: "pointer" }}>
      {word}
    </span>
  );
});
