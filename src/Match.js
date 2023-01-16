
function Match({ players, onClick, index }) {
  return (
    <div className="match">
        <div className="player" onClick={onClick} data-key={2 * index}>{ players[0] }</div>
        {players.length === 2 && <div className="player" onClick={onClick} data-key={2 * index + 1}>{ players[1] }</div>}
    </div>
  );
}

export default Match;
