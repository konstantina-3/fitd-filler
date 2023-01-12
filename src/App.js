import Round from './Round.js';
import './App.css';

let initial_players = [
  "Player 1",
  "Player 2",
  "Player 3",
  "Player 4",
  "Player 5",
  "Player 6",
  "Player 7",
  "Player 8",
  "Player 11",
  "Player 12",
  "Player 13",
  "Player 14",
  "Player 15",
  "Player 16",
  "Player 17",
  "Player 18",
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Fill in the Draw!
        </p>
        <div className='rounds'>
          <Round players={initial_players} />
        </div>
      </header>
    </div>
  );
}

export default App;
