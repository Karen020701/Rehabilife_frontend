import React, { useState } from "react";
import axios from "axios";
import mqtt from "mqtt";
import "./styles/suggestion-box.css";
import config from "../config"; 

const SuggestionBox = () => {
  const [suggestion, setSuggestion] = useState("");
  const [message, setMessage] = useState("");

 
  const client = mqtt.connect("mqtt://broker.hivemq.com");

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  const handleInputChange = (e) => {
    setSuggestion(e.target.value);
  };

  const handleSubmit = async () => {
    if (suggestion.trim() === "") {
      setMessage("Please enter a suggestion.");
      return;
    }

    try {
     
      await axios.post(config.BASE_URL_SUGGESTIONS, { suggestion });

      
      client.publish(config.MQTT_TOPIC, JSON.stringify({ suggestion }));

      setMessage("Suggestion submitted successfully!");
      setSuggestion(""); 
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      setMessage("Failed to submit suggestion.");
    }
  };

  return (
    <div className="suggestion-container">
      <h2>Suggestion Box</h2>
      <textarea
        value={suggestion}
        onChange={handleInputChange}
        placeholder="Write your suggestion here..."
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SuggestionBox;
