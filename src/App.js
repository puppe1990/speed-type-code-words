import React, { useState } from "react";
import "./TyperTester.css";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const languages = [
  { id: 1, name: "Ruby" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "Python" },
];

const codeSamples = {
  1: 'puts "Hello, World!"',
  2: 'console.log("Hello, World!");',
  3: 'print("Hello, World!")',
};

function TyperTester() {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentCode, setCurrentCode] = useState(codeSamples[selectedLanguage]);
  const [typingProgress, setTypingProgress] = useState(0);

  const handleLanguageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedLanguage(selectedValue);
    setCurrentCode(codeSamples[selectedValue]);
    setUserInput("");
    setTypingProgress(0);
  };

  const handleCodeEdit = (event) => {
    setCurrentCode(event.target.textContent);
    setUserInput("");
    setTypingProgress(0);
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);

    let typedChars = event.target.value;
    let correctChars = currentCode.slice(0, typedChars.length);

    // Calculate the progress based on the number of correctly typed characters
    let progress = (correctChars.length / currentCode.length) * 100;
    setTypingProgress(progress);
  };

  const handleStart = () => {
    setStartTime(Date.now());
  };

  const handleKeyDown = (event) => {
    if (event.target.value === currentCode) {
      setEndTime(Date.now());
      setTimeTaken((endTime - startTime) / 1000);
    }
  };

  const handleKeyUp = (event) => {
    setUserInput(event.target.value);

    let typedChars = event.target.value;
    let correctChars = currentCode.slice(0, typedChars.length);

    // Calculate the progress based on the number of correctly typed characters
    let progress = (correctChars.length / currentCode.length) * 100;
    setTypingProgress(progress);
  };

  return (
    <div className="typer-tester">
      <label>Select Language:</label>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option value={language.id} key={language.id}>
            {language.name}
          </option>
        ))}
      </select>
      <div className="code-display">
        <SyntaxHighlighter
          language={languages
            .find((language) => language.id === selectedLanguage)
            .name.toLowerCase()}
          style={darcula}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleCodeEdit}
        >
          {currentCode}
        </SyntaxHighlighter>
      </div>
      <textarea
        className="my-textarea"
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <div className="progress">
        <ProgressBar
          now={typingProgress}
          label={`${typingProgress === 100 ? "Complete!" : typingProgress}%`}
        />
      </div>
      <button className="start-button" onClick={handleStart}>
        START
      </button>
      {endTime && <p>Time Taken: {timeTaken} seconds</p>}
    </div>
  );
}

export default TyperTester;
