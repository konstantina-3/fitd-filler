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
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Fill in the Draw!
        </p>
        <Round players={initial_players} />
      </header>
    </div>
  );
}

export default App;
