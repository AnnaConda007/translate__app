import { colors } from "../../theme/tokens/colors";

export enum InputStatus {
  Success = "success",
  Error = "error",
    Warning = "warning",

    None = "",

 }


interface InputUiProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: InputStatus ;
}

export const InputUi= ({ value, onChange, status=InputStatus.None }:InputUiProps) => {

 const bgColor = {
  [InputStatus.Success]: "bg-success",
  [InputStatus.Error]: "bg-error",

  [InputStatus.Warning]: "bg-orange-500",
  [InputStatus.None]: "",
}[status];



 

    return(
        <input     className={`w-full ${bgColor} p-1 outline-none rounded-md border-2 border-solid`}
value={value} type="text" onChange={onChange} />
    )

}