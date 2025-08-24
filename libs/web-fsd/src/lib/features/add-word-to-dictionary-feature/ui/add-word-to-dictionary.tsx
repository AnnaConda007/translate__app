import { useAddWordToDictionary } from '../model/use-add-word-to-dictionary';
import { Icon } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

  const handleButton = () => {
    handleSendWord({ source, translation });
    onAdded?.();
  };

  return (
    <button className="close-delay" onClick={handleButton}>
      <Icon
        component={AddCircleOutlineIcon}
        sx={{
          fontSize: 30,
          color: '#66bb6a',
        }}
      />
    </button>
  );
};
