function GameOver({ winner,handleRestart }) {
    return (
      <div id='game-over'>
        <h2>Game Over!</h2>
        {winner ? <p> {winner} Wins</p> : <p>Match Draw</p>}
        <p><button onClick={handleRestart} >Rematch!</button></p>
      </div>
    );
  }
  
  export default GameOver;
  