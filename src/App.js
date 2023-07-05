import { useState } from 'react';
import Round from './Round.js';
import './App.css';

function App() {
  const [players, setPlayers] = useState(null);

  function isPowerOf2(number) {
    return number && !(number & (number - 1));
  }

  function handleTextAreaChange(e) {
    let input_players = e.target.value
      .split(/ vs |\n/)
      .filter(item => item)
      .map(item => item.trim().replace(/\s\s+/g, ' '));

    if (isPowerOf2(input_players.length)) {
      setPlayers(input_players);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Fill in the Draw!</h1>
        <h2>Creates an interactive bracket of any tournament size (2<sup>n</sup> participants)</h2>
      </header>
      <textarea
        onChange={handleTextAreaChange}
        placeholder="Enter each first round match in a new line with the player names separated by ' vs '. E.g:
Swiatek vs Zhu
Sabalenka vs Udvardy"
        name="players-input" id="players-input" rows="20">
      </textarea>
      <div className='rounds'>
        {players && <Round players={players} key={players}/>}
      </div>
    </div>
  );
}

export default App;
