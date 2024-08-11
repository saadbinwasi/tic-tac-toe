import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./Winning_Combinations"
import GameOver from "./components/GameOver"

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
]



const deriveActivePlayer = (gameTurns) => {
  let currplayer = 'X';


  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currplayer = 'O'
  }

  return currplayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playername,SetPlayername] = useState({
    'X': 'Player 1',
    'Y': 'Player 2'
  })

  
 let gameBoard = [...initialGameBoard.map(array => [...array])];
for(const turn of gameTurns) {
const {square,player} = turn;
const {row,col} = square;

gameBoard[row][col] = player;
}

let winner;

  const activeplayer = deriveActivePlayer(gameTurns)

  for (const combination of WINNING_COMBINATIONS){
    const FirstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const SecondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const ThirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (FirstSquareSymbol && FirstSquareSymbol === SecondSquareSymbol && FirstSquareSymbol === ThirdSquareSymbol ){
   winner = playername[FirstSquareSymbol]
    }
  }



  const handleSelectSquare = (rowIndex,colIndex) => {
    setGameTurns((prevturns) => {
   
      const currplayer = deriveActivePlayer(prevturns);
      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex},player: currplayer},
        ...prevturns,
      ] 

      return updatedTurns;
    })
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleRestart = () => {
    setGameTurns([])
  }

  const handlePlayerNameChanger = (symbol,Newname) => {
    SetPlayername((prevname) => {
      return {
      ...prevname,
      [symbol]: Newname
      }
     
    })
  }

  return (
<main>

<div id="game-container">
<ol id='players' className="highlight-player">
<Player onChangePlayerName={handlePlayerNameChanger} name="Player 1" symbol="X" isActive={activeplayer === 'X'}/>
<Player onChangePlayerName={handlePlayerNameChanger} name="Player 2" symbol="O" isActive={activeplayer === 'O'}/>

</ol>
{(winner || hasDraw) && <GameOver winner={winner} handleRestart={handleRestart} />}
<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
</div>
<Log turns={gameTurns} />
</main>
  )
}

export default App
