import {ReaderWidget} from "../../widgets/reader-widget/reader-widget"
 import { NawEnum } from "../../shared/ui-kit/ui-kit-nav/ui-kit-naw"
 import { NawUi } from "../../shared/ui-kit/ui-kit-nav/ui-kit-naw"

export const ReaderPage = ()=>{
        const nawValues = [NawEnum.HOME,NawEnum.LIBRARY, NawEnum.TESTS, NawEnum.TRANSLATOR]
        
return(
<>
 
 

        <ReaderWidget/>
        <NawUi  navItems={nawValues} />


</>
)
}