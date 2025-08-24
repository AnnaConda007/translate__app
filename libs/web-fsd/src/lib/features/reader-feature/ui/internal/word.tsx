import { memo } from 'react';

interface Props {
  word: string;
}

export const WordSpan = memo(({ word }: Props) => {
  if (!word.trim()) return <span>{word}</span>;

  return (
    <span
      data-word={word}
      style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }}
    >
      {word}
    </span>
  );
});
