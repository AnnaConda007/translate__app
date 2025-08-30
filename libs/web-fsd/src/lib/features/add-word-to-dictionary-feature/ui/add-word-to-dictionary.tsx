import { useAddWordToDictionary } from '../model/use-add-word-to-dictionary';
import { Icon } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ButtonIconUi } from '../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon';
import { TextUi } from '../../../shared/ui-kit/ui-kit-text/ui-kit-text';
import { use, useEffect, useState } from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
interface Props {
  source: string;
  translation: string;
  onAdded?: () => void;
}

export const AddWordToDictionaryFeature = ({
  source,
  translation,
  onAdded,
}: Props) => {
  const { handleSendWord } = useAddWordToDictionary();
  const [IconCmp, setIconCmp] = useState(() => AddCircleOutlineIcon);

   useEffect(() => {
    setIconCmp(() => AddCircleOutlineIcon);  
  }, [source]); 

  
  const handleButton = () => {
    try {
          handleSendWord({ source, translation });
    onAdded?.();
      setIconCmp(() => DoneOutlineIcon);
    } catch (e) {
            setIconCmp(() => ReportProblemIcon);

      
    }
 
  };

  return (
        <div className="close-delay" >
               <ButtonIconUi  Icon={IconCmp} handleButton={handleButton}/>
   </div>
 
     
  );
};
