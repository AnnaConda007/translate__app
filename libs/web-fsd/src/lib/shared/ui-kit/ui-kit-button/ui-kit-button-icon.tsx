interface Props {
  Icon: React.ElementType;
  handleButton?: () => void;
}
  
 export const ButtonIconUi = ({ Icon, handleButton }: Props) => {
  return (
    <button type="button"
      className="active:scale-125 transition-transform duration-100 pl-1 pr-1 "
      onClick={handleButton}
    >
      <Icon   />
    </button>
  );
};