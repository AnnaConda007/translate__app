import { useState } from 'react';
import { InputUi } from '../../../shared/ui-kit/ui-kit-input/ui-kit-input';
import {  useLogin } from '../model/use-login';
 import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {ButtonTextUi} from  "../../../shared/ui-kit/ui-kit-button/ui-kit-button-text"
import { Status } from '../../../shared/ui-kit/type';
import { TextUi } from '../../../shared/ui-kit/ui-kit-text/ui-kit-text';

 

 
export const LoginForm = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const {    email, password,
     emailInvalid, passwordInvalid,
     loading, error,
     handleEmail, handlePassword,
    clearError,
    submitLoginForm,} =useLogin();
 


const     handleButton= (e?: React.ChangeEvent<HTMLInputElement>) => {
   e?.preventDefault()
       setPasswordIsVisible(v => !v)}

  return (
    <form className=' flex flex-col gap-3 items-center  min-w-80 relative'>
      <InputUi 
      placeholder='Email'
      status={ emailInvalid ?   Status.Error:  Status.None}
         value={email}
        onChange={(e) => handleEmail((e.target as HTMLInputElement).value)}
        large={true}
           
        

      />
      <InputUi
      placeholder='Пароль'
           status={ passwordInvalid ?  Status.Error : Status.None }
        large={true}
        type={passwordIsVisible ? "text" :"password"}
        value={password}
        onChange={(e) => handlePassword((e.target as HTMLInputElement).value)}
        Icon={passwordIsVisible ?  VisibilityOffIcon  : VisibilityIcon}
        handleIcon={(e: React.ChangeEvent<HTMLInputElement>)=>handleButton(e)}
      />
    <TextUi  text={error}  status={ Status.Error}/>
   
 
         <ButtonTextUi transparent={false} value={"Войти"} handleButton={(e?: React.ChangeEvent<HTMLInputElement>) => {e?.preventDefault()
          submitLoginForm()}} />

    </form>
  );
};
