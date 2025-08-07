export const ButtonUi = ({title, handleButton})=>{
    return(
<button className="bg-cyan-400" onClick={handleButton}>
  {title}
</button>
    )

}