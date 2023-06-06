function Switcher(props) {
  return (
    <button
      className="absolute right-10 top-10 text-black rounded-2xl border-2 p-2"
      onClick={props.handleSwitch}
    >
      switch
    </button>
  );
}

export default Switcher;
