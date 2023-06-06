import { useState } from "react";

function Menu(props) {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-10">
      <button className="text-5xl font-bold" onClick={props.handleStart}>
        Start Game
      </button>
      <button className="text-5xl font-bold" onClick={props.handleQuit}>
        Quit
      </button>
    </div>
  );
}

export default Menu;
