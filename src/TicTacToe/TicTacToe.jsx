import React, { useEffect, useReducer } from 'react';

import { ImCross } from 'react-icons/im';

import styles from './game.module.css';

// whenver You need click option please use button for it
const CrossMark = ({ size }) => (<ImCross color='#545454' fontSize={size} />);
const CircleMark = () => (
  <div
    className={styles.circle}
  >
  </div>
)

const Box = ({ marker, handlePlay, index }) => {
  return (
    <button
      style={{
        height: '200px',
        width: '200px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={() => {
        handlePlay(index);
      }}
    >
      {marker === 'x' && <CrossMark size="100px" />}
      {marker === 'o' && <CircleMark />}
    </button>
  )
}

const Board = ({ boardData, handlePlay }) => {
  return (
    <div
      style={{
        height: '600px',
        width: '600px',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
      }}
    >
      {boardData.map((value, index) => (
        <Box
          key={`${value}-${index}`}
          index={index}
          marker={value}
          handlePlay={handlePlay}
        />
      ))}
      <div
        className={styles.hozStrip}
        style={{
          position: 'absolute',
          top: '195px',
        }}
      ></div>
      <div
        className={styles.hozStrip}
        style={{
          position: 'absolute',
          top: '395px',
        }}
      ></div>
      <div
        className={styles.verStrip}
        style={{
          position: 'absolute',
          left: '195px',
        }}
      ></div>
      <div
        className={styles.verStrip}
        style={{
          position: 'absolute',
          left: '395px',
        }}
      ></div>
    </div>
  )
}

const initialState = {
  player: 'x',
  boardData: [
    '', '', '',
    '', '', '',
    '', '', '',
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'X_PLAY':
      let tempData = [...state.boardData]
      if (tempData[action.index] !== '') {
        return state;
      }
      console.log('Reducer Line 106');
      tempData[action.index] = 'x';
      return {
        ...state,
        // next player setting
        player: 'o',
        boardData: tempData
      }
    case 'O_PLAY':
      let tempBoard = [...state.boardData];
      if (tempBoard[action.index] !== '') {
        return state;
      }
      tempBoard[action.index] = 'o';
      return {
        ...state,
        // next player setting
        player: 'x',
        boardData: tempBoard
      }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const TicTacToe = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const checkWin = () => {
    const data = state.boardData;
    let winnerFlag = false;
    let winner = '';

    // check the vertical axis one
    if (data[0] !== '' && data[0] === data[3] && data[0] === data[6]) {
      winnerFlag = true;
      if (data[0] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }
    // check the vertical axis two
    else if (data[1] !== '' && data[1] === data[4] && data[1] === data[7]) {
      winnerFlag = true;
      if (data[1] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }
    // check the vertical axis three
    else if (data[2] !== '' && data[2] === data[5] && data[2] === data[8]) {
      winnerFlag = true;
      if (data[2] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }
    // check the horizontal axis one
    else if (data[0] !== '' && data[0] === data[1] && data[0] === data[2]) {
      winnerFlag = true;
      if (data[1] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }
    // check the horizontal axis two
    else if (data[3] !== '' && data[3] === data[4] && data[3] === data[5]) {
      winnerFlag = true;
      if (data[3] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }
    // check the horizontal axis three
    else if (data[6] !== '' && data[6] === data[7] && data[6] === data[8]) {
      winnerFlag = true;
      if (data[6] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }
    else if (data[0] !== '' && data[0] === data[4] && data[0] === data[8]) {
      winnerFlag = true;
      if (data[0] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }
    else if (data[2] !== '' && data[2] === data[4] && data[2] === data[6]) {
      winnerFlag = true;
      if (data[2] === 'x') {
        winner = 'x';
      } else {
        winner = 'o'
      }
    }

    if (winnerFlag) {
      setTimeout(() => {
        alert(`Winner is ${winner}`);
        dispatch({ type: 'RESET' });
      }, 500)
    } else if (state.boardData.filter((value) => value === '').length === 0) {
      setTimeout(() => {
        alert(`Draw Match`);
        dispatch({ type: 'RESET' });
      }, 500)
    }
  }

  const handlePlay = (index) => {
    if (state.player === 'x') {
      dispatch({ type: 'X_PLAY', index: index });
    }
    else {
      dispatch({ type: 'O_PLAY', index: index });
    }
  }

  useEffect(() => {
    checkWin();
  }, [state.player])

  return (
    <Board
      boardData={state.boardData}
      handlePlay={handlePlay}
    />
  )
};


export default TicTacToe;
