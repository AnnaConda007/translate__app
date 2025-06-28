import { useLogin } from '../model/use-login';

export const LoginForm = ()=>{
const { email, password, setEmail, setPassword, submitLoginForm, loading, error } = useLogin();

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



/*
const newUser = (email: string, password: string)=>{
    const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
     const user = userCredential.user;
console.log(user)  })
}
    


const onClick = async ()=>{
  const token = await auth.currentUser?.getIdToken();
 
 console.log(token)
     const response = await axios.post(
    'http://localhost:3000/api/translate',
    { text: 'hello' },
    {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    }
  );
console.log(response.data)
  return response.data;
};


*/