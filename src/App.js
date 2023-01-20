import React, { useState } from 'react';

const languages = [  { id: 1, name: 'Ruby' },  { id: 2, name: 'JavaScript' },  { id: 3, name: 'Python' },  { id: 4, name: 'C' },  { id: 5, name: 'Go' },  { id: 6, name: 'Assembly (16-bit x86)' },  { id: 7, name: 'Machine Code' },  { id: 8, name: 'Java' },]

const codeSamples = {
  1: 'puts "Hello, World!"',
  2: 'console.log("Hello, World!");',
  3: 'print("Hello, World!")',
  4: '#include <stdio.h>\n\nint main() {\n  printf("Hello, World!");\n  return 0;\n}',
  5: 'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, World!")\n}',
  6: 'section .data\n  msg db "Hello, World!", 0\nsection .text\n  global _start\n\n_start:\n  mov edx, 13\n  mov ecx, msg\n  mov ebx, 1\n  mov eax, 4\n  int 0x80\n\n  mov eax, 1\n  int 0x80',
  7: '48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 0a',
  8: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}'
}

function TyperTester() {
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentCode, setCurrentCode] = useState(codeSamples[selectedLanguage]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setCurrentCode(codeSamples[event.target.value]);
    setUserInput("");
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
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
        {languages.map(language => <option value={language.id} key={language.id}>{language.name}</option>)}
      </select>
      <pre>{currentCode}</pre>
      <textarea value={userInput} onChange={handleChange} onKeyPress={handleKeyPress} />
      { endTime && <p>Time Taken: {timeTaken} seconds</p> }
    </div>
  );
}

export default TyperTester;