export const ButtonUi = ({title, handleButton})=>{
    return(
<button className="bg-cyan-400 p-2 rounded-xl min-w-50 mx-auto block " onClick={handleButton}>
  {title}
</button>
    )

}