import { useLogin } from '../model/use-login';

export const LoginForm = ()=>{
const { email, password, setEmail, setPassword, submitLoginForm } = useLogin();

const handleEmail = (email:string)=>{
  setEmail(email)
}

const handlePassword= (password:string)=>{
  setPassword(password)
}

    return(
<>
<input type="text" value={email} onInput={(e) => handleEmail((e.target as HTMLInputElement).value)}/>  
<input type="password"  value={password}  onInput={(e) => handlePassword((e.target as HTMLInputElement).value)}/>  
<button onClick={()=>submitLoginForm(email,password)}>отправить</button>
</> 
 )}

 
 