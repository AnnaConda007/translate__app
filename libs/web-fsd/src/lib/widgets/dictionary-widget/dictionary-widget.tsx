import { DictionaryFeature } from '../../features/dictionary-feature/ui/dictionary';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ButtonIconUi } from '../../shared/ui-kit/ui-kit-button/ui-kit-button-icon';
import { useNavigate } from 'react-router-dom';

export const DictionaryWidget = () => {
  const navigate = useNavigate();

  const handleToAddNewWord = () => {
    navigate('/translator');
  };
  return (
    <main className="  container flex  h-full  m-auto pt-3 items-start">
      <DictionaryFeature />
      <ButtonIconUi
        Icon={AddCircleOutlineIcon}
        handleButton={handleToAddNewWord}
      />
    </main>
  );
};
