 import { Virtuoso } from 'react-virtuoso';
import SimpleBar from 'simplebar-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutoTranslate } from '../../translate-form-feature/ui/auto-translate';
import { useWord } from '../model/useWord';
import { useText } from '../model/useText';
import { WordSpan } from './internal/word';
import { texts } from '../../../shared/ui-texts/ui-texts';
import { Status } from '../../../shared/ui-kit/type';
import { TextUi } from '../../../shared/ui-kit/ui-kit-text/ui-kit-text';
import { SkeletonUi } from '../../../shared/ui-kit/ui-kit-skeletons/ui-kit-test-skeleton';

export const ReaderFeature = () => {
  const { selectedWord, position, setSelectedWord } = useWord();
  
  const { savedParagraphId, wordsArr, saveCurrentParagraph, isError } =
    useText(setSelectedWord);

      useEffect(() => {
    import('simplebar-react/dist/simplebar.min.css');
      localStorage.setItem('current-text', String(title));

  }, []);
  const { title } = useParams<{ title: string }>();


  const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null);

  if (isError)
    return (
      <main className=" container mx-auto flex-grow flex justify-center items-center ">
        <TextUi text={texts.errorText} status={Status.Error} />
      </main>
    );
  return (
    <main className=" container mx-auto flex-grow overflow-hidden   ">
      <article className="h-full">
        {!wordsArr?.length ? (
          <SkeletonUi testItemsAmount={100} small={true} />
        ) : (
          <SimpleBar
            className="h-full"
            scrollableNodeProps={{ ref: setScrollParent }}
          >
            {scrollParent && (
              <Virtuoso
                className="h-full"
                key={title}
                totalCount={wordsArr.length}
                initialTopMostItemIndex={savedParagraphId}
                customScrollParent={scrollParent}
                rangeChanged={({ startIndex }) =>
                  saveCurrentParagraph(startIndex)
                }
                itemContent={(index) => {
                  const words = wordsArr[index];
                  return (
                    <p id={`paragraph-${index}`} className="py-2 leading-5">
                      {words.map((word, j) => (
                        <WordSpan key={`${index}-${j}`} word={word} />
                      ))}
                    </p>
                  );
                }}
              />
            )}
          </SimpleBar>
        )}
      </article>

      {selectedWord && position && (
        <AutoTranslate value={selectedWord} position={position} />
      )}
    </main>
  );
};
