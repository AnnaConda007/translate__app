export enum InputStatus {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',

  None = '',
}

interface InputUiProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onEnterHandle?: () => void;
  status?: InputStatus;
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
  status = InputStatus.None,
  textInfo,
  isReadOnly = false,
  placeholder,
}: InputUiProps) => {
  const statusColor = {
    [InputStatus.Success]: 'bg-success',
    [InputStatus.Error]: 'bg-error',
    [InputStatus.Warning]: 'bg-orange-500',
    [InputStatus.None]: '',
  };
  const bgColor = isTransparent ? 'bg-transparent' : statusColor[status];

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
        className={`w-full ${bgColor} outline-none rounded-md  ${cursor}`}
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
