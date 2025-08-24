
import { Status } from "../type";
import { StatusBgColorClass , StatusTextColorClass} from "../constants";
 

interface InputUiProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onEnterHandle?: () => void;
  status?: Status;
  isReadOnly?: boolean;
  placeholder?: string;
  textInfo?: string | null;
  isTransparent?: boolean;
}

export const InputUi = ({
  value,
  isTransparent,
  onChange,
  onEnterHandle,
  onClick,
  status = Status.None,
  textInfo,
  isReadOnly = false,
  placeholder,
}: InputUiProps) => {
 
  const color = isTransparent ? 'bg-transparent' : StatusTextColorClass[status];

  const cursor = isReadOnly ? 'cursor-pointer' : 'cursor-text';

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!onEnterHandle) return;
      onEnterHandle();
    }
  };

  return (
    <div className="w-full  p-1">
      <input
        placeholder={placeholder || undefined}
        readOnly={isReadOnly}
        className={`w-full  ${color} outline-none rounded-md  ${cursor}`}
        value={value}
        type="text"
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onEnter}
      />
      <div></div>
      {textInfo && <span>{textInfo}</span>}
    </div>
  );
};
