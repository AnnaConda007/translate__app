 import { InputsLoginName ,InputsRegisterName} from "../types/auth-type";


export const setValidate = (v: string, name:InputsLoginName|InputsRegisterName, invalidMap:Record<InputsLoginName|InputsRegisterName, (b: boolean) => void>) => {
  const checkInvalidInputValueValue =   v.trim().length ==0
    invalidMap[name]?.(checkInvalidInputValueValue);
}
