import React from 'react'
import './AdvancedBoard.css'
import { useEffect } from 'react'
import { useState } from 'react'

const AdvancedBoard = ({ player, setPlayer, winner, setWinner, gameOver, setGameOver,playerScore, setPlayerScore}) => {
    const initialboard = Array(9).fill(null).map(() => Array(9).fill(''));
    const [gameboard, setGameboard] = React.useState(initialboard);
    const [winBoard, setWinBoard] = React.useState([['','',''],['','',''],['','','']]);
    
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

    function checkWinner(){
        let pl1 = 0;
        let pl2 = 0;
        let draw = 0;
        for (let i=0; i<3; i+=1){
            for (let j=0 ; j<3; j+=1){
                if (winBoard[i][j]==='X') pl1+=1;
                else if (winBoard[i][j]==='O') pl2+=1;
                else if (winBoard[i][j]==='draw') draw+=1;
            }
        }
        if (pl1 > 4){
            setWinner('X');
            setGameOver(true);
            return;
        }
        if (pl2 > 4){
            setWinner('O');
            setGameOver(true);
            return;
        }
        if (pl1 + pl2 + draw === 9){
            if (pl1>pl2)
            {
                setWinner('X');
                setGameOver(true);
                return;
            }
            else if (pl2>pl1){
                setWinner('O');
                setGameOver(true);
                return;
            }
            setWinner('draw');
            setGameOver(true);
            return;
        }
    }

    function checkGameboard(r, c, board){
        let row = Math.floor(r/3);
        let col = Math.floor(c/3);
        
        let count = 0;
        let i,j = 0;

        const rr = row*3;
        const cc = col*3;

        for (i=0 ; i<3 ; i+=1)
        {
            for (j=0; j<3; j+=1)
                {
                    if (board[i+rr][j+cc]==='X' || board[i+rr][j+cc]==='O') count+=1;
                } 
        }

        if (count === 9)
        {
            const newWinBoard = winBoard;
            newWinBoard[row][col] = 'draw';
            setPlayer('X');
            setWinBoard(newWinBoard);
            for (let ii=0; ii<3; ii+=1){
                for (let jj=0 ;jj<3 ; jj++)
                {
                    document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'gray';
                }
            }
            return;
        }
        for (i=0 ; i<3 ; i++)
        {
            if (board[rr+i][cc+0]==board[rr+i][cc+1] && board[rr+i][cc+0]==board[rr+i][cc+2] && board[rr+i][cc+0]!==undefined && board[rr+i][cc+0]!=='')
            {
                setPlayer('X');
                const newWinBoard = winBoard;
                newWinBoard[row][col] = board[rr+i][cc+0];
                setWinBoard(newWinBoard);

                for (let ii=0; ii<3; ii+=1){
                    for (let jj=0 ;jj<3 ; jj++)
                    {
                        if (board[r][c]=='X')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'green';
                        if (board[r][c]=='O')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'orange';
                    }
                }
                return;
            }
            if (board[rr+0][cc+i]==board[rr+1][cc+i] && board[rr+0][cc+i]==board[rr+2][cc+i] && board[rr+0][cc+i]!=undefined && board[rr+0][cc+i]!='')
            {
                setPlayer('X');
                const newWinBoard = winBoard;
                newWinBoard[row][col] = board[rr+0][cc+i];
                setWinBoard(newWinBoard);

                for (let ii=0; ii<3; ii+=1){
                    for (let jj=0 ;jj<3 ; jj++)
                    {
                        if (board[r][c]=='X')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'green';
                        if (board[r][c]=='O')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'orange';
                    }
                }
                return;
            }
        }
        if (board[rr+0][cc+0]==board[rr+1][cc+1] && board[rr+0][cc+0]==board[rr+2][cc+2] && board[rr+0][cc+0]!=undefined && board[rr+0][cc+0]!=''){
            const newWinBoard = winBoard;
            newWinBoard[row][col] = board[rr+0][cc+0];
            setWinBoard(newWinBoard);
            setPlayer('X');
            for (let ii=0; ii<3; ii+=1){
                for (let jj=0 ;jj<3 ; jj++)
                {
                    if (board[r][c]=='X')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'green';
                    if (board[r][c]=='O')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'orange';
                }
            }
            return;
        }
        if (board[rr+0][cc+2]==board[rr+1][cc+1] && board[rr+2][cc+0]===board[rr+1][cc+1] && board[rr+1][cc+1]!=undefined && board[rr+1][cc+1]!=''){
            const newWinBoard = winBoard;
            newWinBoard[row][col] = board[rr+1][cc+1];
            setWinBoard(newWinBoard);
            setPlayer('X');
            for (let ii=0; ii<3; ii+=1){
                for (let jj=0 ;jj<3 ; jj++)
                {
                    if (board[r][c]=='X')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'green';
                    if (board[r][c]=='O')document.querySelector(`#id${rr+ii}${cc+jj}`).style.backgroundColor = 'orange';
                }
            }
            return;
        }
        
    }

    const buttonClickHandler = (e) => {
        const rownum = e.target.id[2];
        const colnum = e.target.id[3];
        console.log(rownum, colnum);
        if (gameboard[rownum][colnum] !== undefined && gameboard[rownum][colnum] !== '' || winBoard[Math.floor(rownum/3)][Math.floor(colnum/3)] !== ''){
            return;
        }
        const newGameBoard = gameboard.map((row, rowIndex)=>{
            return row.map((cell, colIndex)=>{
                if(rowIndex.toString() === rownum && colIndex.toString() === colnum){
                    return player;
                }
                return cell;
            });
        });
        setGameboard(newGameBoard);
        setPlayer(player === 'X' ? 'O' : 'X');
        checkGameboard(rownum, colnum, newGameBoard);
        checkWinner();
    }

    return (
    <div id='board1'>
      {
        gameboard.map((row, rowId)=>{
           return (
            <div key={rowId} id='rows1'>
              {
                row.map((cell, colId)=>{
                  return (
                    <button key={colId} id={'id'+rowId.toString() + colId.toString()} onClick={buttonClickHandler} className={`clickCell1 ${(rowId === 3 || rowId === 6) ? 'siderow' : ''} ${colId === 3 || colId === 6 ? 'sidecol' : ''}`} >{gameboard[rowId][colId]}</button>
                  )
                })
              }
            </div>
           )
        })
      }
      {gameOver===true && <button onClick={()=>{setGameboard(initialboard); setWinBoard([['','',''],['','',''],['','','']]); setGameOver(false); setWinner(''); for(let i=0; i<9 ; i+=1) {for (let j=0; j<9; j+=1) {document.querySelector(`#id${i}${j}`).style.backgroundColor='white';}}}} className='resetButton2'>Reset</button>}
    </div>
  )
}

export default AdvancedBoard
