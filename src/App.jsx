import { useState } from 'react'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ]

  function getWinner(squares) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }

    }
    return (null)
  }

  function handleSquareClick(index) {


    if (board[index] || getWinner(board)) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";


    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);


  }


  function getGameStatus() {
    const winner = getWinner(board);


    if (winner) return `Winner: ${winner}`;

    if (board.every((square) => square !== null)) {
      return "¡Es un empate!"
    }

    return `Es el turno de: ${isXTurn ? "X" : "O"}`

  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setIsXTurn(true)
  }



  return (
    <div className='min-h-screen bg-[#0c0636] flex items-center justify-center'>
      <div className='w-full max-w-[400px] mt-5 mx-5'>
        <h1 className='text-5xl p-6 font-bold rounded-xl text-[#0c0636] mb-8 text-center  bg-[#9fd86b]'>
          TicTacToe
        </h1>

        <div className={`text-center mb-6 ${getWinner(board) ? "z-10 text-5xl font-bold text-green-500 animate-bounce" : "text-xl text-white"}`}>
          {getGameStatus()}
        </div>


        <div className='grid grid-cols-3 gap-1 rounder-xl mb-6'>
          {board.map((square, index) => (
            <button key={index}
            onClick={() => handleSquareClick(index)}
            className={`h-32 w-full bg-[#095169] rounded-md text-6xl font-bold transition-colors duration-100 hover:bg-[#059b9a] ${square === "X" ? "transition-none text-blue-600" : "text-red-600"}`}
            >
            {square}
            </button>
        ))}

        </div>


        <button className='w-full py-3 text-lg text-white font-bold borrder rounded-xl hover:bg-[#059b9a] hover:text-gray-800'
        onClick={resetGame}
        >
          JUGAR DE NUEVO</button>
      </div>
    </div>

  )
}

export default App
