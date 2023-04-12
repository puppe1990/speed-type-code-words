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
    const typedChars = event.target.value;
    let correctChars = "";

    for (let i = 0; i < typedChars.length; i++) {
      if (typedChars[i] === currentCode[i]) {
        correctChars += typedChars[i];
      } else {
        break;
      }
    }

    const progress = (correctChars.length / currentCode.length) * 100;
    setTypingProgress(progress);

    setUserInput(typedChars);
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
      <p>Improve Your Typing Speed and Accuracy with Typer Tester</p>
      <p>
        Typer Tester is a free typing test application that allows you to
        practice and improve your typing skills. Choose from multiple
        programming languages like Ruby, JavaScript and Python and test your
        speed and accuracy by typing code samples for the selected language.
      </p>
      <p>
        As you type, Typer Tester provides real-time feedback on your progress
        and words per minute typing speed. The minimal and distraction-free
        interface allows you to focus on the code you're typing. Track your
        typing stats over time to see your improvement and achieve your goal of
        becoming an expert typist.
      </p>
      <p>
        Whether you're a developer looking to practice your craft or an aspiring
        programmer keen to learn a new coding language, make Typer Tester a part
        of your daily typing practice. Build muscle memory for key programming
        syntax and become more confident typing code.
      </p>
      {/* Key features section */}
      <p>
        <b>Key Features:</b>
      </p>
      <ul>
        <li>Choose between Ruby, JavaScript and Python coding languages</li>
        <li>
          Practice typing actual code samples in the language of your choice
        </li>
        <li>
          Get your words per minute typing speed and accuracy results in
          real-time
        </li>
        <li>Minimal interface without ads or distractions</li>
        <li>Track your typing stats and progress over time</li>
        <li>Completely free to use</li>
      </ul>
      <p>
        Take your programming and typing skills to the next level with Typer
        Tester. Start practicing for free today!
      </p>
    </div>
  );
}

export default TyperTester;
