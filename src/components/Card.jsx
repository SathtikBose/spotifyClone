function Card({ songCoverImage, songName, songCardClick, id }) {
  return (
    <div
      className="h-80 w-70 border-2 bg-gray-500 cursor-pointer rounded-2xl flex flex-col justify-evenly ite"
      onClick={() => songCardClick(id)}
    >
      <img
        className="rounded-2xl border-2 border-amber-400"
        src={songCoverImage}
        alt={songName}
      />
      <h2 className="text-center font-bold">{songName}</h2>
    </div>
  );
}

export default Card;
