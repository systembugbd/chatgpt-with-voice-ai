import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [voiceMsg, setVoiceMessage] = useState("");
  const [response, setResponse] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ message: transcript || message }));

    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: transcript || message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  const handleStart = () => {
    SpeechRecognition.startListening();
  };
  const stopHandle = () => {
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="App">
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={() => handleStart()}>Start</button>
        <button onClick={() => stopHandle()}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          rows={5}
          cols={20}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit" className="button">
          Submit
        </button>
        {response && <div>{response}</div>}
      </form>
    </div>
  );
}

export default App;
