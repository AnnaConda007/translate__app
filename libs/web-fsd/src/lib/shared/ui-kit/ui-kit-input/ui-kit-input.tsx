
import { Status } from "../type";
import {   StatusBorderClass, StatusTextColorClass} from "../constants";
import { ButtonIconUi } from "../ui-kit-button/ui-kit-button-icon";
import { TextUi } from "../ui-kit-text/ui-kit-text";
 

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
  type?:string,
  large?:boolean,
  Icon?:React.ElementType;
  handleIcon ?:(e?:any)=>void

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
  type="text",
  large,
  Icon,
  handleIcon

 
}: InputUiProps) => {
    const border = isReadOnly ? "" :`border-2  ${StatusBorderClass[status]}`;

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
      <div className={` w-full rounded-md  flex  ${large ? 'p-2' : '' }  ${color} ${border}` }> 
      <input
        placeholder={placeholder || undefined}
        readOnly={isReadOnly}
        value={value}
        type={type}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onEnter}
 className={` outline-none flex-grow ${cursor} `}
      />
      { Icon &&  
       <ButtonIconUi Icon={Icon}      
           handleButton={() => { 
             if(handleIcon)   handleIcon()
            }} 
       />
}

      </div>
 





   
 


           {textInfo && <TextUi text={textInfo}  />}
     </div>
  );
};
