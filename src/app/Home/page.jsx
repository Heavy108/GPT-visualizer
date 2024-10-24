"use client";
import { ComboboxDemo } from "@/Component/NavBar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useState } from "react";
import bhavna from "@/Assets/bhavna.gif";
import Image from "next/image";
import style from "@/CSS/home.module.css";
import { Textarea } from "@/components/ui/textarea";

function Gpt() {
  const [temperature, setTemperature] = useState(1.4);
  const [maxTokens, setMaxTokens] = useState(15);
  const [input, setInput] = useState("");
  const [predictedText, setPredictedText] = useState("Start Typing...");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(""); // Store selected model
  console.log(selectedModel)
  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleMaxTokensChange = (e) => {
    setMaxTokens(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendRequest = async () => {
    setLoading(true); 
    try {
      console.log(temperature, maxTokens, input);
      const response = await fetch(`http://127.0.0.1:8000/models/${selectedModel}`, { // Use selectedModel here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temp: temperature,
          max_tokens_count: maxTokens,
          start_text: input,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPredictedText(data.text); 
      } else {
        console.error("Failed to get prediction:", data);
      }
    } catch (error) {
      console.error("Error while fetching:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handlePredictedTextClick = () => {
    setInput((prevInput) => predictedText);
    setPredictedText(""); 
  };

  return (
    <>
      <div className={style.title}>
        <Image src={bhavna} width={40} height={40} alt="bhavna" />
        <HoverCard>
          <HoverCardTrigger>Next Word Predictor</HoverCardTrigger>
          <HoverCardContent>
            Bengali Hindi Assamese Virtual Neural Agent
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className={style.NavBar}>
        <h1>GPT Visualizer</h1>
        <ComboboxDemo onSelect={setSelectedModel} /> {/* Pass setSelectedModel as a prop */}
      </div>
      <div className={style.inputContainer}>
        <div className={style.Parameters}>
          <div className={style.ParaComponent}>
            <label className={style.label}>Temperature</label>
            <input
              type="range"
              value={temperature}
              min="0"
              max="5"
              step="0.1"
              onChange={handleTemperatureChange}
            />
            <span className={style.output}>{temperature}</span>
          </div>
          <div className={style.ParaComponent}>
            <label className={style.label}>Max Tokens</label>
            <input
              type="range"
              value={maxTokens}
              min="15"
              max="150"
              step="1"
              onChange={handleMaxTokensChange}
            />
            <span className={style.output}>{maxTokens}</span>
          </div>
        </div>
        <div className={style.predict}>
          <Textarea
            placeholder="Enter text for Predicting the Next Word"
            value={input}
            onChange={handleInputChange}
          />
          <button className={style.predictButton} onClick={sendRequest}>
            Predict Next Word
          </button>
        </div>
      </div>

      <div className={style.PredictedOutput} onClick={handlePredictedTextClick}>
        {loading ? (
          <div className={style.skeleton}>Generating..</div>
        ) : (
          <h1>Predicted text: {predictedText}</h1>
        )}
      </div>
    </>
  );
}

export default Gpt;
