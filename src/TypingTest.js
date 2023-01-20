import React, { useState } from 'react';

const difficultyLevels = [  { id: 1, name: 'Easy', text: 'The quick brown fox jumps over the lazy dog.' },  { id: 2, name: 'Medium', text: 'The five boxing wizards jump quickly.' },  { id: 3, name: 'Difficult', text: 'Supercalifragilisticexpialidocious' },]

const wordWeights = {
  'a': 1,
  'the': 1,
  'an': 1,
  'friendship': 2,
  'neighborhood': 2,
}

function TypingTest() {
  const [difficulty, setDifficulty] = useState(1);
  const [displayText, setDisplayText] = useState(difficultyLevels[difficulty].text);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setDisplayText(difficultyLevels[event.target.value].text);
    setUserInput("");
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
    const inputArray = event.target.value.split(" ");
    let weight =
    inputArray.reduce((acc, word) => acc + (wordWeights[word] || 1), 0);
    setAccuracy(weight / inputArray.length * 100);
  };

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    setTimeout(() => {
      setEndTime(Date.now());
      setIsRunning(false);
      const words = userInput.split(" ").length;
      const time = (endTime - startTime) / 1000;
      setWordsPerMinute(words / (time / 60));
    }, 60000);
  };

  return (
    <div>
      <label>Select Difficulty:</label>
      <select value={difficulty} onChange={handleDifficultyChange}>
        {difficultyLevels.map(level => <option value={level.id} key={level.id}>{level.name}</option>)}
      </select>
      <div>
        <pre>
          {displayText.split('').map((char, index) => {
            if (index === userInput.length) {
              return <span style={{color: 'green'}} key={index}>{char}</span>
            } else if (index > userInput.length) {
              return <span key={index}>{char}</span>
            } else if (char !== userInput[index]) {
              return <span style={{color: 'red'}} key={index}>{char}</span>
            } else {
              return <span key={index}>{char}</span>
            }
          })}
        </pre>
      </div>
      <textarea value={userInput} onChange={handleChange} />
      { !isRunning && <button onClick={handleStart}>START</button> }
      { isRunning && <p>Time Remaining: {timer} seconds</p> }
      { !isRunning && wordsPerMinute && <p>Words per Minute: {wordsPerMinute}</p> }
      { !isRunning && accuracy && <p>Accuracy: {accuracy}%</p> }
    </div>
  );
}

export default TypingTest;
