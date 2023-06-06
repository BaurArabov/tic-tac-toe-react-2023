import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Zagruzka from "./components/Zagruzka";
import Grid from "./components/Grid";
import Player from "./components/Player";
import Switcher from "./components/Switcher";
import Menu from "./components/Menu";

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
  const [theme, setTheme] = useState("light");
  const [start, setStart] = useState(true);

  //start the game
  const handleStart = () => {
    setStart(false);
  };

  //quit the game -- close browser tab
  const handleQuit = () => {
    console.log("clicked quit");
    window.close();
  };

  //listen to every theme update/change
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  //change theme
  const handleSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  //play tic-tac-toe
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

  //check for the winner
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
      setTimeout(() => {
        setGameResult("");
        setPlayer(true);
        setUser(true);
        setStart(true);
        setGrid([
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
      }, 10000);
      setPlayerOneMoves([]);
      setPlayerTwoMoves([]);
    } else if (playerOneMoves.length + playerTwoMoves.length === 9) {
      setGameResult("Draw!");
      setTimeout(() => {
        setGameResult("");
        setPlayer(true);
        setUser(true);
        setStart(true);
        setGrid([
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
        setPlayerOneMoves([]);
        setPlayerTwoMoves([]);
      }, 10000);
    }
  }

  console.log(gameResult);

  return (
    <MainLayout>
      {start ? (
        <Menu handleStart={handleStart} handleQuit={handleQuit} />
      ) : gameResult ? (
        <>
          <div className="absolute top-20 inset-x-0 flex items-center justify-center text-5xl font-bold text-green">
            {gameResult}
          </div>
          <Grid grid={grid} handlePlay={handlePlay} theme={theme} />
          <Switcher handleSwitch={handleSwitch} />
        </>
      ) : (
        <>
          <Player player={player} />
          <Grid grid={grid} handlePlay={handlePlay} theme={theme} />
          <Switcher handleSwitch={handleSwitch} />
        </>
      )}
    </MainLayout>
  );
}

export default App;
