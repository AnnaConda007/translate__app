import { useRegister } from '../model/use-register';

export const RegisterForm = ()=>{
const { email, password, setEmail, setPassword, submitRegisterForm, loading, error } = useRegister();

const handleEmail = (email:string)=>{
  setEmail(email)
}

const handlePassword= (password:string)=>{
  setPassword(password)
}

    return(
<>mnnn
<input type="text" value={email} onInput={(e) => handleEmail((e.target as HTMLInputElement).value)}/>  
<input type="password"  value={password}  onInput={(e) => handlePassword((e.target as HTMLInputElement).value)}/>  
<button onClick={()=>submitRegisterForm(email,password)}>отправить</button>
</> 
 )}