import React, { useEffect } from 'react'
import './GameBoard.css'

const GameBoard = ({gameboard1, setGameboard1, player, setPlayer, winner, setWinner, gameOver, setGameOver, playerScore , setPlayerScore}) => {
    useEffect(() => {
        if (gameOver) {
            if (winner === 'X') {
                const updatedScore = [playerScore[0] + 1, playerScore[1]];
                setPlayerScore(updatedScore);
                localStorage.setItem('Player1', updatedScore[0]);
            } else if (winner === 'O') {
                const updatedScore = [playerScore[0], playerScore[1] + 1];
                setPlayerScore(updatedScore);
                localStorage.setItem('Player2', updatedScore[1]);
            }
        }
    }, [gameOver, winner]);
    
    function checkWinner(board) {
        let count = 0;
        let i,j = 0;
        for (i=0 ; i<3 ; i+=1)
        {
            for (j=0; j<3; j+=1)
                {
                    if (board[i][j]==='X' || board[i][j]==='O') count+=1;
                } 
        }
        if (count === 9)
        {
            console.log('draw');
            setWinner('draw');
            setGameOver(true);
            document.querySelectorAll(".clickCell").forEach((cell)=>{cell.style.backgroundColor = 'red'; cell.style.color = 'white';});
            return;
        }
        for (i=0 ; i<3 ; i++)
        {
            if (board[i][0]==board[i][1] && board[i][0]==board[i][2] && board[i][0]!==undefined && board[i][0]!=='')
            {
                setWinner(board[i][0]);
                setGameOver(true);
                document.querySelector(`#id${i}0`).style.backgroundColor = 'green';
                document.querySelector(`#id${i}1`).style.backgroundColor = 'green';
                document.querySelector(`#id${i}2`).style.backgroundColor = 'green';
                return;
            }
            if (board[0][i]==board[1][i] && board[0][i]==board[2][i] && board[0][i]!=undefined && board[0][i]!='')
            {
                setWinner(board[0][i]);
                setGameOver(true);
                document.querySelector(`#id0${i}`).style.backgroundColor = 'green';
                document.querySelector(`#id1${i}`).style.backgroundColor = 'green';
                document.querySelector(`#id2${i}`).style.backgroundColor = 'green';
                return;
            }
        }
        if (board[0][0]==board[1][1] && board[0][0]==board[2][2] && board[0][0]!=undefined && board[0][0]!=''){
            setWinner(board[0][0]);
            setGameOver(true);
            document.querySelector("#id00").style.backgroundColor = 'green';
            document.querySelector("#id11").style.backgroundColor = 'green';
            document.querySelector("#id22").style.backgroundColor = 'green';
            return;
        }
        if (board[0][2]==board[1][1] && board[2][0]===board[1][1] && board[1][1]!=undefined && board[1][1]!=''){
            setWinner(board[1][1]);
            setGameOver(true);
            document.querySelector('#id02').style.backgroundColor = 'green';
            document.querySelector('#id11').style.backgroundColor = 'green';
            document.querySelector('#id20').style.backgroundColor = 'green';
            return;
        }
    }

    function buttonClickHandler(e){
        if (gameOver) return ;
        const rownum = e.target.id[2];
        const colnum = e.target.id[3];
        if (gameboard1[rownum][colnum] !== undefined && gameboard1[rownum][colnum] !== '') {
            alert('Invalid Move');
            return;
        }
        console.log(player);
        const newGameBoard1 = gameboard1.map((row, rowIndex)=>{
            return row.map((cell, colIndex)=>{
                if(rowIndex.toString() === rownum && colIndex.toString() === colnum){
                    return player;
                }
                return cell;
            });
        });
        setGameboard1(newGameBoard1);
        setPlayer(player === 'X' ? 'O' : 'X');
        checkWinner(newGameBoard1);
    }

  return ( 
    <div id="board">
      {
        gameboard1.map((row, rowId)=>{
           return (
            <div key={rowId} id='rows'>
              {
                row.map((cell, colId)=>{
                  return (
                    <button key={colId} id={'id'+rowId.toString() + colId.toString()} onClick={buttonClickHandler} className='clickCell'>{gameboard1[rowId][colId]}</button>
                  )
                })
              }
            </div>
           )
        })
      }
    </div>
  )
}

export default GameBoard
