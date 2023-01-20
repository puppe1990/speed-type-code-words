import React, { useState } from 'react';

const languages = [  { id: 1, name: 'Ruby' },  { id: 2, name: 'JavaScript' },  { id: 3, name: 'Python' },  { id: 4, name: 'C' },  { id: 5, name: 'Go' },  { id: 6, name: 'Assembly (16-bit x86)' },  { id: 7, name: 'Machine Code' },  { id: 8, name: 'Java' },]

const codeSamples = {
  1: 'puts "Hello, World!"',
}

function TyperTester() {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentCode, setCurrentCode] = useState(codeSamples[selectedLanguage]);
  const [isCorrect, setIsCorrect] = useState(true);
  const [nextLetter, setNextLetter] = useState("");

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setCurrentCode(codeSamples[event.target.value]);
    setUserInput("");
    setIsCorrect(true);
    setNextLetter("");
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
    if (event.target.value === currentCode.substring(0, event.target.value.length)) {
      setIsCorrect(true);
      setNextLetter(currentCode[event.target.value.length]);
    } else {
      setIsCorrect(false);
    }
  };

  const handleKeyPress = (event) => {
    if(event.target.value === currentCode) {
      setEndTime(new Date());
      setTimeTaken((endTime - startTime) / 1000);
    } else {
      if (!startTime) {
        setStartTime(new Date());
      }
    }
  };

  return (
    <div>
      <label>Select Language:</label>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map(language => <option value={language.id}
                key={language.id}>{language.name}</option>)}
                </select>
                <pre>
                  {currentCode.split('').map((char, index) => {
                    if (index === userInput.length && isCorrect) {
                      return <span style={{color: 'green'}} key={index}>{char}</span>
                    } else if (index === userInput.length && !isCorrect) {
                      return <span style={{color: 'red'}} key={index}>{char}</span>
                    } else {
                      return <span key={index}>{char}</span>
                    }
                  })}
                </pre>
                <textarea value={userInput} onChange={handleChange} onKeyPress={handleKeyPress} />
                { endTime && <p>Time Taken: {timeTaken} seconds</p> }
              </div>
            );
          }
          
          export default TyperTester;
          
