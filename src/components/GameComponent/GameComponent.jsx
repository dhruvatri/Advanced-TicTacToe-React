import React, { useEffect } from 'react'
import GameBoard from '../GameBoard/GameBoard'
import AdvancedBoard from '../AdvancedBoard/AdvancedBoard'
import './GameComponent.css'

const GameComponent = () => {
    const [gameboard1, setGameboard1] = React.useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']]
);
const [player, setPlayer] = React.useState('X'); 
const [winner, setWinner] = React.useState('');
const [gameOver, setGameOver] = React.useState(false);
const [playerScore, setPlayerScore] = React.useState([0,0]);
const [board, setboard] = React.useState(0);

useEffect(() => {
    const player1Score = parseInt(localStorage.getItem('Player1')) || 0;
    const player2Score = parseInt(localStorage.getItem('Player2')) || 0;
    setPlayerScore([player1Score, player2Score]);

    // Initialize local storage if empty
    if (!localStorage.getItem('Player1')) {
        localStorage.setItem('Player1', 0);
    }
    if (!localStorage.getItem('Player2')) {
        localStorage.setItem('Player2', 0);
    }
}, []);

function resetHandler(e){
    setGameboard1([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']]
    );
    document.querySelectorAll(".clickCell").forEach((cell)=>{cell.style.backgroundColor = 'white'; cell.style.color = 'black';});
    setPlayer('X');
    setWinner('');
    setGameOver(false);
}

function normalBoardhandler(e){
    setboard(0);
    setGameOver(false);
    setPlayer('X');
    setWinner('');
    setGameboard1([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']]
    );
}

function AdvancedBoardhandler(e){
    setboard(1);
    setGameOver(false);
    setPlayer('X');
    setWinner('');
}

function resetScorehandler(e){
    localStorage.setItem('Player1', 0);
    localStorage.setItem('Player2', 0);
    setPlayerScore([0,0]);
}
  return (
    <div id='mainScreen'>
        <div id='changeBoard'>
            <button onClick={normalBoardhandler} className='changeButton'>3 x 3</button>
            <button onClick={AdvancedBoardhandler} className='changeButton'> 9 x 9 </button>
        </div>
        <h1 id='Winnertext'>{ gameOver? (winner==='draw'? 'Game Draw - Play Again' : winner==='X'? 'Player 1 Won' : 'Player 2 Won') : 'Tic Tac Toe Game'}</h1>
        <div id='browserScreen'>
        <div className='playerScreen'>
            <h2>Player 1 <span style={{backgroundColor : 'red', color : 'white'}}> {player==='X' && '👈'} </span></h2>
            <h1>X</h1>
            <h2>Score : {playerScore[0]} </h2>
        </div>

        { board===0 && <GameBoard gameboard1={gameboard1} setGameboard1={setGameboard1} player={player} setPlayer={setPlayer} winner={winner} setWinner={setWinner} gameOver={gameOver} setGameOver={setGameOver} playerScore={playerScore} setPlayerScore={setPlayerScore}/>}
        { board===1 && <AdvancedBoard 
            player={player}
            setPlayer={setPlayer}
            winner={winner}
            setWinner={setWinner}
            gameOver={gameOver}
            setGameOver={setGameOver}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
        /> }
        
        <div className='playerScreen'>
            <h2>  <span style={{backgroundColor : 'red', color : 'white'}}> {player==='O' && '👉'}</span> Player 2</h2>
            <h1>O</h1>
            <h2>Score :  {playerScore[1]} </h2>
        </div>
        </div>
        {gameOver===true && board==0 && (<button id='resetButton' onClick={resetHandler}>Reset Game</button>)}
        <button onClick={resetScorehandler} id='resetButton'>Reset Score</button>
    </div>
  )
}
export default GameComponent
