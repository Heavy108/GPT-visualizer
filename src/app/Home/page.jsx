"use client";
import { ComboboxDemo } from "@/Component/NavBar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import bhavna from "@/Assets/bhavna.gif";
import Image from "next/image";
import style from "@/CSS/home.module.css";
import { Textarea } from "@/components/ui/textarea";

function Gpt() {
  // Separate state for Temperature and Max Tokens
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);

  // Handlers for both sliders
  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleMaxTokensChange = (e) => {
    setMaxTokens(e.target.value);
  };

  return (
    <>
      <div className={style.title}>
        <Image src={bhavna} width={40} height={40} alt="bhavna" />
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
      <div className={style.inputContainer}>
          
       
      <div className={style.Parameters}>
        {/* Temperature Slider */}
        <div className={style.ParaComponent}>
          <label className={style.label}> Temperature</label>
          {/* <div className={style.Input}></div> */}
          <input
            type="range"
            value={temperature}
            min="0"
            max="5"
            step="1"
            onChange={handleTemperatureChange}
          />
          <span className={style.output}>{temperature}</span>
        </div>
        {/* Max Tokens Slider */}
        <div className={style.ParaComponent}>
          <label className={style.label}> Max Tokens </label>
          <input
            type="range"
            value={maxTokens}
            min="0"
            max="5"
            step="1"
            onChange={handleMaxTokensChange}
          />
          <span className={style.output}>{maxTokens}</span>
        </div>
        
      </div>
      <Textarea placeholder="Enter text for Predicting the Next Word"/>
      </div>
    </>
  );
}

export default Gpt;
