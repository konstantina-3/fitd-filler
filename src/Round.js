import { useState, useContext, useEffect } from 'react';
import Match from './Match.js';
import { RoundContext } from './RoundContext.js';


function Round({ players, setComplete }) {
  const [winners, setWinners] = useState(new Array(Math.floor(players.length/2)));
  const round = useContext(RoundContext);

  const matches = players.reduce((accumulator, _, currentIndex, array) => {
    if (currentIndex % 2 === 0) {
      accumulator.push(array.slice(currentIndex, currentIndex + 2));
    }
    return accumulator;
  }, [])

  function handlePlayerClick(e) {
    if (!e.target.innerText) return;

    const insertAt = Math.floor(e.target.dataset.key/2);

    const nextWinners = [
      ...winners.slice(0, insertAt),
      e.target.innerText,
      // the old item at insertAt is replaced
      ...winners.slice(insertAt + 1)
    ];

    setWinners(nextWinners);
  }

  if (players) {
    // should a match winner change we want their old winner's potential further round wins to be emptied
    for (let i = 0; i < players.length; i += 2) {
      if (winners[i/2] && winners[i/2] !== players[i] && winners[i/2] !== players[i+1]) {
        const nextWinners = [
            ...winners.slice(0, i/2),
            undefined,
            ...winners.slice(i/2 + 1)
        ];

        setWinners(nextWinners);
      }
    }
  }

  useEffect(() => {
    // if (players.every(value => value !== undefined) && (players.length / 2 === winners.length || players.length === 1)) {
    //   console.log(true, round, complete)
    // }
    // else {
    //   console.log(false, round)
    // }
    if (players.length === 1 && players[0] !== undefined) {
      setComplete(true)
    }

    if (!players.every(value => value !== undefined)){
      setComplete(false)
    }
  }, [players, winners, setComplete]);

  return (
    <>
      <div className='round-container'>
        <div className='round'>{players && matches.map((match, index) =>
          <Match players={match} onClick={handlePlayerClick} index={index} key={index} ></Match>
        )}</div>
        {players.some(item => item !== undefined) && <div className='round-info'>Round {round}</div>}
      </div>
      <RoundContext.Provider value={round + 1}>
        {players && players.length > 1 && <Round players={winners} setComplete={setComplete}/>}
      </RoundContext.Provider>
    </>
  );
}

export default Round;
