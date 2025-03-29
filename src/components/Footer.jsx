function Footer({
  songPlayPause,
  isPlaying,
  handleForward,
  handleBackward,
  currentTime,
  songDuration,
  songPLayAhead,
}) {
  const percentage = (currentTime / songDuration) * 100;

  return (
    <div className="flex flex-col justify-evenly m-8 shadow-xl rounded-2xl p-4  bg-green-800">
      <input
        type="range"
        min={0}
        max={100}
        value={percentage ? percentage : 0}
        onChange={(e) => songPLayAhead(e.target.value)}
      />
      <div className="w-full flex justify-evenly text-3xl">
        <button className="cursor-pointer" onClick={() => handleBackward()}>
          <i className="fa-solid fa-backward-step"></i>
        </button>
        <button className="cursor-pointer" onClick={() => songPlayPause()}>
          <i
            className={`fa-solid fa-circle-${!isPlaying ? "play" : "pause"}`}
          ></i>
        </button>
        <button className="cursor-pointer" onClick={() => handleForward()}>
          <i className="fa-solid fa-forward-step"></i>
        </button>
      </div>
    </div>
  );
}

export default Footer;
