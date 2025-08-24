import { useRegister } from '../model/use-register';

export const RegisterForm = ()=>{
const { email, password, setEmail, setPassword, submitRegisterForm, name, setName} = useRegister();

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
<input type="text"  value={name}     onInput={(e) => setName((e.target as HTMLInputElement).value)}
/>  
<button onClick={()=>submitRegisterForm(email, name,password)}>отправить</button>
</> 
 )}