import { useState } from 'react';
import Round from './Round.js';
import './App.css';

function App() {
  const [players, setPlayers] = useState(null);
  const [complete, setComplete] = useState(false);
  const [result, setResult] = useState('');

  function isPowerOf2(number) {
    return number && !(number & (number - 1));
  }

  function handleTextAreaChange(e) {
    let input_players = e.target.value
      .split(/ vs | v |\n/)
      .filter(item => item)
      .map(item => item.trim().replace(/\s\s+/g, ' '));

    if (isPowerOf2(input_players.length)) {
      setPlayers(input_players);
    }
    console.log(input_players)
    setComplete(false);
  }

  if (complete) {
    let text = "";

    const rounds = document.querySelectorAll('.round-container');
    rounds.forEach(el => {
      const players = [...el.querySelectorAll('.player')]
                  .map(player => player.innerHTML);

      const round = el.querySelector('.round-info').innerHTML;

      if (round === "Round 1") return; // we want the winners of R1 and so on

      switch (players.length) {
        case 1:
          text += 'F\n';
          break;
        case 2:
          text += 'SF\n';
          break;
        case 4:
          text += 'QF\n';
          break;
        default:
          text += "R" + (Number(round.slice(-1)) - 1) + '\n';
      }

      text += players.join('\n') + '\n';
    });

    if (result !== text) {
      setResult(text);
    }
  }
  else if (result !== '') {
    setResult('');
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Fill in the Draw!</h1>
        <h2>Paste the draw (of any tournament size), fill it in using the interactive bracket and then copy the full result!</h2>
      </header>
      <div className='input-result'>
        <div className='players-input'>
          <textarea
            onChange={handleTextAreaChange}
            placeholder="Enter each first round match in a new line with the player names separated by ' vs '. E.g:
    Swiatek vs Zhu
    Udvardy vs Sabalenka"
            name="players-input" id="players-input" rows="20">
          </textarea>
        </div>
        <div className='copy-result'>
          <textarea
            readOnly={true}
            value={result}
            placeholder="Your result will appear here only after your bracket is complete to avoid mistakes."
            name="copy-result" id="copy-result" rows="20">
          </textarea>
          <button type='button' disabled={!complete} onClick={copyResult}>Copy Result</button>
        </div>
      </div>
      <div className='rounds'>
        {players && <Round players={players} key={players} setComplete={setComplete}/>}
      </div>
    </div>
  );
}

export default App;
