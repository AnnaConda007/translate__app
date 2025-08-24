import { useAddTextToLibrary } from '../model/use-add-text-to-library.ts';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ButtonIconUi } from '../../../shared/ui-kit/ui-kit-button/ui-kit-button-icon.js';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { InputUi } from '../../../shared/ui-kit/ui-kit-input/ui-kit-input.js';
import CloseIcon from '@mui/icons-material/Close';

export const AddTextToLibraryFeature = () => {
  const {
    title,
    content,
    setTextTitle,
    handleFileUpload,
    handleSendText,
    isAlreadyExistText,
    fileAdded,
    setFileAdded,
    setIsAlreadyExist,
  } = useAddTextToLibrary();

  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = await handleFileUpload(e);
    setFileAdded(true);
    if (!title) return;
    setTextTitle(title);
  };

  const handleClose = () => {
    setFileAdded(false);
    setIsAlreadyExist(null);
  };

  return (
    <>
      <label htmlFor="file-input">
        <input
          className="hidden"
          id="file-input"
          type="file"
          accept=".txt,.md,.docx,.html"
          onChange={handleAddFile}
        />
        <UploadFileIcon className="active:scale-125 transition-transform duration-100" />
      </label>
      {fileAdded && (
        <div className=" p-3 bg-main  absolute top-0 left-0 w-full h-full  flex flex-col items-end ">
          <ButtonIconUi Icon={CloseIcon} handleButton={handleClose} />

          <div className="flex flex-grow justify-center items-center wrap  w-full ">
            <InputUi
              textInfo={isAlreadyExistText}
              value={title}
              onChange={(e) => setTextTitle(e.target.value)}
            />
            <ButtonIconUi
              Icon={FileUploadIcon}
              handleButton={() => handleSendText({ title, content })}
            />
          </div>
        </div>
      )}
    </>
  );
};
