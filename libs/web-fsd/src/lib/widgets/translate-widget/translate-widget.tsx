import { TranslateForm } from '../../features/translate-form-feature/ui/translate-form';
import { AddWordToDictionaryFeature } from '../../features/add-word-to-dictionary-feature/ui/add-word-to-dictionary';
import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { SkeletonUi } from '../../shared/ui-kit/ui-kit-skeletons/ui-kit-test-skeleton';

export const TranslateWidget = () => {
  const [source, setSource] = useState('');
  const [result, setResult] = useState('');
  const [IsTranslatedVisible, setIsTranslatedVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);

  const onTranslated = ({
    source,
    translated,
  }: {
    source: string;
    translated: string;
  }) => {
    setIsTranslatedVisible(false);
    const word = translated;
    setResult(word);
    setSource(source);
    setIsTranslatedVisible(true);
  };

  const onLoad = (isLoading: boolean) => {
    setIsLoad(isLoading);
  };

  const isErr = (isError: boolean) => {
    setIsError(isError);
  };

  return (
    <main className={`   h-full w-full bg-cyan-100 `}>
      <div className="container m-auto h-full ">
        <div className=" h-1/3 flex items-end">
          <TranslateForm
            setResult={setResult}
            onTranslated={onTranslated}
            disabled={isLoad}
            isError={isErr}
            onLoad={onLoad}
            value={source}
          />
        </div>
        {isError && 'Error'}

        {IsTranslatedVisible && (
          <div className="flex justify-between mt-2 pl-1">
            {isLoad && <SkeletonUi />}

            {
              <SimpleBar className="  h-1/3 w-2/3 ">
                <span className="break-words"> {result}</span>
              </SimpleBar>
            }

            <AddWordToDictionaryFeature source={source} translation={result} />
          </div>
        )}
      </div>
    </main>
  );
};

//
