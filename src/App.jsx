import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Zagruzka from "./components/Zagruzka";
import Grid from "./components/Grid";
import Player from "./components/Player";

function App() {
  const [grid, setGrid] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 6, text: "" },
    { id: 7, text: "" },
    { id: 8, text: "" },
    { id: 9, text: "" },
  ]);
  const [user, setUser] = useState(true);
  const [player, setPlayer] = useState(true);
  const [playerOneMoves, setPlayerOneMoves] = useState([]);
  const [playerTwoMoves, setPlayerTwoMoves] = useState([]);
  const [gameResult, setGameResult] = useState("");

  function handlePlay(elementID) {
    if (gameResult) {
      return;
    }

    const currentPlayerMoves = user ? playerOneMoves : playerTwoMoves;

    if (
      playerOneMoves.includes(elementID) ||
      playerTwoMoves.includes(elementID)
    ) {
      return;
    }

    const newGrid = grid.map((item) => {
      if (item.id === elementID && !item.text) {
        return { ...item, text: user ? "X" : "O" };
      }
      return item;
    });

    currentPlayerMoves.push(elementID);

    setUser(!user);
    setPlayer(!player);
    setGrid(newGrid);

    check(currentPlayerMoves);
  }

  function check(currentPlayerMoves) {
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    const isWinner = winningCombinations.some((combination) =>
      combination.every((move) => currentPlayerMoves.includes(move))
    );

    if (isWinner) {
      const winner = user ? "X" : "O";
      setGameResult(`Player ${winner} wins!`);
    } else if (playerOneMoves.length + playerTwoMoves.length === 9) {
      setGameResult("Draw!");
    }
  }

  return (
    <MainLayout>
      {gameResult ? (
        <div className="absolute top-20 inset-x-0 flex items-center justify-center text-5xl font-bold text-green">
          {gameResult}
        </div>
      ) : (
        <Player player={player} />
      )}
      <Grid grid={grid} handlePlay={handlePlay} />
    </MainLayout>
  );
}

export default App;
