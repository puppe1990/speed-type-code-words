import React, { useState } from "react";
import "./TyperTester.css";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
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
  const [isCorrect, setIsCorrect] = useState(true);
  const [nextLetter, setNextLetter] = useState("");
  const [typingProgress, setTypingProgress] = useState(0);
  const [editableCode, setEditableCode] = useState(
    codeSamples[selectedLanguage]
  );

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setCurrentCode(codeSamples[event.target.value]);
    setUserInput("");
    setIsCorrect(true);
    setNextLetter("");
    setTypingProgress(0);
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
    setTypingProgress((event.target.value.length / currentCode.length) * 100);
    if (
      event.target.value === currentCode.substring(0, event.target.value.length)
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleCodeEdit = (event) => {
    setEditableCode(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.target.value === currentCode) {
      setEndTime(Date.now());
      setTimeTaken((endTime - startTime) / 1000);
    }
  };

  const handleStart = () => {
    setStartTime(Date.now());
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
        >
          {currentCode}
        </SyntaxHighlighter>
      </div>
      <div className="user-input">
        <div
          className="editable-input"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleChange}
          onKeyPress={handleKeyPress}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {userInput}
        </div>
      </div>
      <textarea
        value={userInput}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className="progress">
        <ProgressBar now={typingProgress} label={`${typingProgress}%`} />
      </div>
      <button className="start-button" onClick={handleStart}>
        START
      </button>
      {endTime && <p>Time Taken: {timeTaken} seconds</p>}
    </div>
  );
}

export default TyperTester;
