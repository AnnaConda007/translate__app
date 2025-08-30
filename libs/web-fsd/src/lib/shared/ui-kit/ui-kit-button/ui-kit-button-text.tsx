interface Props {
  value: string;
  handleButton?: () => void;
    transparent?:boolean


}
  
 export const ButtonTextUi = ({ value, handleButton , transparent=true}: Props) => {
  return (
    <button 
      className={`active:scale-95 transition  duration-100 p-2  ${transparent ?' text-dark' :" bg-main  p-2 rounded-xl text-secondary hover:bg-main-light hover:duration-100 min-w-60"  }`}
      onClick={handleButton}
    >
{value}    </button>
  );
};