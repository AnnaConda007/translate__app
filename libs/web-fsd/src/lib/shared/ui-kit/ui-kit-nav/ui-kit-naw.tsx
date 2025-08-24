import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useLocation } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';

export enum NawPathEnum {
  LIBRARY = '/',
  TESTS = '/tests',
  TRANSLATOR = '/translator',
  CURRENT_TEXT = '/read',
  DICTIONARY = '/dictionary',
}

export const NawUi = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const title = localStorage.getItem('current-text');

  const navMap: Record<NawPathEnum, { path: string; Icon: React.ElementType }> =
    {
      [NawPathEnum.DICTIONARY]: {
        path: NawPathEnum.DICTIONARY,
        Icon: DescriptionIcon,
      },
      [NawPathEnum.TESTS]: { path: NawPathEnum.TESTS, Icon: SchoolIcon },
      [NawPathEnum.TRANSLATOR]: {
        path: NawPathEnum.TRANSLATOR,
        Icon: TranslateIcon,
      },

      [NawPathEnum.LIBRARY]: { path: NawPathEnum.LIBRARY, Icon: MenuBookIcon },
      [NawPathEnum.CURRENT_TEXT]: {
        path: `${NawPathEnum.CURRENT_TEXT}/${title}`,
        Icon: BookmarkIcon,
      },
    };

  const nawValues = [
    NawPathEnum.TESTS,
    NawPathEnum.TRANSLATOR,
    NawPathEnum.DICTIONARY,
    NawPathEnum.LIBRARY,
    NawPathEnum.CURRENT_TEXT,
  ];

  return (
    <nav>
      <ul className="  flex justify-evenly gap-10 p-4">
        {nawValues.map((item, i) => {
          const segments = pathname.split('/');
          const activeNav = `/${segments[1]}` === item;
          const { path, Icon } = navMap[item];
          return (
            <li key={i} >
              <a href={path}>
  <Icon
      className={`
        ${activeNav ? ' text-main-dark scale-125' : 'text-main '}
    `}
      fontSize="medium"
    />              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
