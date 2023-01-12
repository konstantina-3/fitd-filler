import { useState } from 'react';
import './App.css';

function Round({ players }) {
  const [winners, setWinners] = useState(new Array(Math.floor(players.length/2)));

  function handlePlayerClick(e) {
    const insertAt = Math.floor(e.target.dataset.key/2);
    
    const nextWinners = [
      ...winners.slice(0, insertAt),
      e.target.innerText,
      // the old item at insertAt is replaced
      ...winners.slice(insertAt + 1)
    ];

    console.log(nextWinners)

    setWinners(nextWinners);
  }

  for (let i = 0; i < players.length; i += 2) {
    if (winners[i/2] && winners[i/2] !== players[i] && winners[i/2] !== players[i+1]) {
        // should a match winner change we want their old winner's potential further round wins to be emptied
        const nextWinners = [
            ...winners.slice(0, i/2),
            undefined,
            ...winners.slice(i/2 + 1)
          ];
        setWinners(nextWinners);
    }    
  }

  return (
    <>
        <ul className='round'>{players.map((player, index) =>
            <li className='player'
                key={index}
                data-key={index}
                onClick={handlePlayerClick}>
                <span>{player}</span>
            </li>
        )}</ul>
        {players.length > 1 && <Round players={winners} />}
    </>
  );
}

export default Round;
