import { useNavigate } from "react-router-dom";
import {TriggerServiceButtonUi} from "../../shared/ui-kit/ui-kit-trigger-service-button/ui-kit-trigger-service-button"

export const LearningTriggerWidget = ()=>{
     const navigate = useNavigate();
const widgetConfig = [
     {
        title:"Библиотека",
        navigate:"/library"
     } ,
      {
        title:"Словарь",
        navigate:"/dictionary"
     } ,
      {
        title:"Переводчик",
        navigate:"/translator"
     } ,
      {
        title:"тесты",
        navigate:"/tests"
     } 
]
 
 return(
    <>
  {widgetConfig.map((service) => (
  <TriggerServiceButtonUi
    key={service.navigate}  
    text={service.title}
    handleButton={() => navigate(service.navigate)}
  />
))}

     </>
)

}