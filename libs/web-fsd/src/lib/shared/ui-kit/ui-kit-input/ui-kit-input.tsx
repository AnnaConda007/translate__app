 
export enum InputStatus {
  Success = "success",
  Error = "error",
    Warning = "warning",

    None = "",

 }


interface InputUiProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;

  status: InputStatus ;
  isReadOnly?:boolean
}

export const InputUi= ({ value, onChange, onClick,status=InputStatus.None, isReadOnly=false }:InputUiProps) => {

 const bgColor = {
  [InputStatus.Success]: "bg-success",
  [InputStatus.Error]: "bg-error",

  [InputStatus.Warning]: "bg-orange-500",
  [InputStatus.None]: "",
}[status];

const cursor = isReadOnly ? "cursor-pointer" :"cursor-text"

 

    return(
        <input    readOnly={isReadOnly}
    className={`w-full ${bgColor} p-1 outline-none rounded-md border-2 border-solid, ${cursor}`}
value={value} type="text" onChange={onChange} onClick={onClick} />
    )

}


 