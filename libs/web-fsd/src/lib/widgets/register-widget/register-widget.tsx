 import { RegisterForm } from "../../features/register-feature/ui/register-form"
 import { Link } from "react-router-dom";  

  export const RegisterWidget = ()=>{
 
    return(
        <>Регистарция
        <RegisterForm></RegisterForm>

        <Link to="/auth/login">
         Уже есть  аккаунт
         </Link>

         </>
    )
}