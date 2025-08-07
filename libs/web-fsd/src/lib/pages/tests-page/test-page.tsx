import {TestSelectAnswerWidget} from "../../widgets/tests-widget/ui/tests-widgget"
  import { NawUi ,NawEnum} from "../../shared/ui-kit/ui-kit-nav/ui-kit-naw"

export const TestsPage =()=>{
            const nawValues = [NawEnum.HOME,NawEnum.LIBRARY, NawEnum.CURRENT_TEXT, NawEnum.TRANSLATOR,NawEnum.DICTIONARY]

    return (<>
     
     <div className="container mx-auto flex-grow flex justify-center items-center
 ">
   <TestSelectAnswerWidget/>
     </div>
                     <NawUi  navItems={nawValues} />

 
    </>)

} 