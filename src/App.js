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
      .split('\n')
      .filter(item => item)
      .map(item => item.trim().replace(/\s\s+/g, ' '));

    if (isPowerOf2(input_players.length)) {
      setPlayers(input_players);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Fill in the Draw!
        </p>
        <div className='players-input'>
            <textarea
              onChange={handleTextAreaChange}
              placeholder="Enter the first round matches by listing all players on individual lines."
              name="players-input" id="players-input" cols="80" rows="20">
            </textarea>
        </div>
        <div className='rounds'>
          {players && <Round players={players} key={players}/>}
        </div>
      </header>
    </div>
  );
}

export default App;
