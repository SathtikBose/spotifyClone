import Card from "./Card";
import ErrorMsg from "./ErrorMsg";
import Spinner from "./Spinner";

function Main({ songData, isLoading, isPlaying, isError, songCardClick }) {
  return (
    <div className="bg-gray-600 m-8 rounded-2xl p-4 flex self-center items-center justify-center">
      <div>{isError && <ErrorMsg />}</div>
      <div>{isLoading && <Spinner />}</div>
      <div className="flex flex-wrap justify-evenly gap-5 columns-3">
        {!isError &&
          !isLoading &&
          songData.length !== 0 &&
          songData.map((song, index) => {
            return (
              <Card
                key={song.Id}
                songCoverImage={song.coverImagePath}
                songName={song.songName}
                songCardClick={songCardClick}
                id={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Main;
