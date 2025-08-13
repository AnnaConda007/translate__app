interface Props {
    currentIndex:number,
    totalLength:number
}

export const ProgressBarUi = ({currentIndex,totalLength}:Props)=>{
    return (
         <div className="w-full bg-blue-400">
     <div
      className="bg-blue-500 h-2 rounded-full "
      style={{
        width: `${((currentIndex ) / totalLength) * 100}%`
      }}
    />
 </div>
    )
}