"use client";
import { ComboboxDemo } from "@/Component/NavBar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState, useEffect } from "react";
import bhavna from "@/Assets/bhavna.gif";
import Image from "next/image";
import style from "@/CSS/home.module.css";
import { Textarea } from "@/components/ui/textarea";
import { Component } from "@/Component/PredicatedGraph";

function Gpt() {
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [input, setInput] = useState("");
  const [predictedText, setPredictedText] = useState("ohh shit");
  const [loading, setLoading] = useState(false); // Loading state

  // Debounce function for input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        sendRequest();
      }
    }, 2000); // 2 seconds debounce

    return () => clearTimeout(timer);
  }, [input, temperature, maxTokens]);

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
    setLoading(true); // Start loading
    try {
      console.log(temperature, maxTokens, input);
      const response = await fetch("http://192.168.87.88:4000/models/asm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "temp":temperature,
         "max_tokens_count": maxTokens,
          "start_text":input,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPredictedText(data.predicted); // Assuming the API returns { predicted: "next word" }
      } else {
        console.error("Failed to get prediction:", data);
      }
    } catch (error) {
      console.error("Error while fetching:", error);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  const handlePredictedTextClick = () => {
    setInput((prevInput) => prevInput + " " + predictedText);
    setPredictedText(""); // Clear predicted text after appending
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
          {/* Max Tokens Slider */}
          <div className={style.ParaComponent}>
            <label className={style.label}>Max Tokens</label>
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
        <Textarea
          placeholder="Enter text for Predicting the Next Word"
          value={input}
          onChange={handleInputChange}
        />
      </div>

      {/* Predicted Text or Skeleton */}
      <div
        className={style.PredictedOutput}
        onClick={handlePredictedTextClick}
      >
        {loading ? (
          <div className={style.skeleton}>Loading...</div> // Display skeleton when loading
        ) : (
          <h1>Predicted text: {predictedText}</h1>
        )}
      </div>

      <div className={style.chart}>
        <Component />
      </div>
    </>
  );
}

export default Gpt;
