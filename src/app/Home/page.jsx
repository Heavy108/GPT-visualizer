import { ComboboxDemo } from "@/Component/NavBar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import  bhavna from "@/Assets/bhavna.gif"
import Image from "next/image";
import style from "@/CSS/home.module.css";
function Gpt() {
  return (
    <>
      <div className={style.title}>
        {/* <Avatar>
          <AvatarImage src={bhavna} />
          
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <Image
          src ={bhavna}
          width = {40}
          height = {40}
          alt = "bhavna"
          />
        <HoverCard>
          <HoverCardTrigger>Bhavna</HoverCardTrigger>
          <HoverCardContent>
            Bengali Hindi Assamese Virtual Neural Agent
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className={style.NavBar}>
        <h1>GPT Visualizer</h1>
        <ComboboxDemo />
      </div>
    </>
  );
}
export default Gpt;
