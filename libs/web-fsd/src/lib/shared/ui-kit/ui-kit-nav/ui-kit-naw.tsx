import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
 

export enum NawEnum  {
    LIBRARY="LIBRARY",
    HOME="HOME",
    TESTS="TESTS",
    TRANSLATOR="TRANSLATOR",
    CURRENT_TEXT="CURRENT_TEXT"

}

interface Props {
  navItems: NawEnum[];

}

export const NawUi = ({navItems}:Props)=>{

const navMap: Record<NawEnum, { path: string; Icon : React.ElementType }> = {
  [NawEnum.LIBRARY]:     { path: "/library", Icon :LibraryBooksIcon },
  [NawEnum.HOME]:        { path: "/", Icon : HomeIcon },
  [NawEnum.TESTS]:       { path: "/tests", Icon : SchoolIcon },
  [NawEnum.TRANSLATOR]:  { path: "/translator", Icon : TranslateIcon},
  [NawEnum.CURRENT_TEXT]:{ path: "/current", Icon : MenuBookIcon },
};


return (
<nav >
<ul className="  flex justify-evenly gap-10 p-4">

    {navItems.map((item, i) => {
      const { path, Icon } = navMap[item];
      return (
        <li key={i}>
          <a href={path}>
            <Icon />
          </a>
        </li>
      );
    })}
  </ul>
</nav>

)



}