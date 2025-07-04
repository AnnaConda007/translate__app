export const TriggerServiceButtonUi =({text, handleButton})=>{

return(
<div role="button" onClick={handleButton}>
    {text}
</div>
)
}