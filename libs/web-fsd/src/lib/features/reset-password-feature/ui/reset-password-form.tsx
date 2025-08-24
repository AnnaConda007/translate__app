 
import {useResetPassword} from "../model/use-reset-password"
 
export const ResetPasswordForm = ()=>{
const { email, setEmail, submitResetPasswordForm } = useResetPassword();

const handleEmail = (email:string)=>{
  setEmail(email)
}

 

    return(
<> 
<input type="text" value={email} onInput={(e) => handleEmail((e.target as HTMLInputElement).value)}/>  
 <button onClick={()=>submitResetPasswordForm(email)}>востановить пароль</button>
</> 
 )}