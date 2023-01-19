import React, { useState } from 'react';

function Typer() {
  const [word, setWord] = useState('');
  const [typedWord, setTypedWord] = useState('');

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setTypedWord(word);
      setWord('');
    }
  };

  return (
    <div>
      <input type="text" value={word} onChange={handleChange} onKeyPress={handleKeyPress} />
      <p>{typedWord}</p>
    </div>
  );
}

export default Typer;
