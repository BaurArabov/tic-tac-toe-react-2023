const Player = (props) => {
  return (
    <div className="absolute top-20 inset-x-0 flex items-center justify-center">
      {props.player ? (
        <p className="text-5xl font-bold text-black">Player X</p>
      ) : (
        <p className="text-5xl font-bold ">Player O</p>
      )}
    </div>
  );
};

export default Player;
