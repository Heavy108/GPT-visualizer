import { ComboboxDemo } from "@/Component/NavBar";
import style from "@/CSS/home.module.css";
function Gpt(){
    return(
        <>
        <div ></div>
        <div className={style.NavBar}>
        <h1>GPT Visualizer</h1>
        <ComboboxDemo/>
        </div>
        
        </>
    )
}
export default Gpt;