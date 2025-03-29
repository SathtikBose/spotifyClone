import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const body = document.body.classList;
body.add("bg-black");
body.add("text-white");

const songJson = {
  song: [
    {
      Id: 0,
      songName: "Agar Tum Saath Ho",
      songPath: "/spotifyClone/songs/song-1.mp3",
      coverImagePath: "/spotifyClone/covers/cover-1.jpg",
    },
    {
      Id: 1,
      songName: "Phir Kabhi",
      songPath: "/spotifyClone/songs/song-2.mp3",
      coverImagePath: "/spotifyClone/covers/cover-2.jpg",
    },
    {
      Id: 2,
      songName: "Shayad",
      songPath: "/spotifyClone/songs/song-3.mp3",
      coverImagePath: "/spotifyClone/covers/cover-3.jpg",
    },
    {
      Id: 3,
      songName: "Soch na Sake",
      songPath: "/spotifyClone/songs/song-4.mp3",
      coverImagePath: "/spotifyClone/covers/cover-4.jpg",
    },
    {
      Id: 4,
      songName: "Tera Fitoor",
      songPath: "/spotifyClone/songs/song-5.mp3",
      coverImagePath: "/spotifyClone/covers/cover-5.jpg",
    },
    {
      Id: 5,
      songName: "Soulmate",
      songPath: "/spotifyClone/songs/song-6.mp3",
      coverImagePath: "/spotifyClone/covers/cover-6.jpg",
    },
    {
      Id: 6,
      songName: "Dil Diyan Gallan",
      songPath: "/spotifyClone/songs/song-7.mp3",
      coverImagePath: "/spotifyClone/covers/cover-7.jpg",
    },
    {
      Id: 7,
      songName: "Jeene Laga Hoon",
      songPath: "/spotifyClone/songs/song-8.mp3",
      coverImagePath: "/spotifyClone/covers/cover-8.jpg",
    },
    {
      Id: 8,
      songName: "Main Rang Sharbaton Ka",
      songPath: "/spotifyClone/songs/song-9.mp3",
      coverImagePath: "/spotifyClone/covers/cover-9.jpg",
    },
    {
      Id: 9,
      songName: "Rozana",
      songPath: "/spotifyClone/songs/song-10.mp3",
      coverImagePath: "/spotifyClone/covers/cover-10.jpg",
    },
    {
      Id: 10,
      songName: "Raataan Lambiyan",
      songPath: "/spotifyClone/songs/song-11.mp3",
      coverImagePath: "/spotifyClone/covers/cover-11.jpg",
    },
    {
      Id: 11,
      songName: "Shree Hanuman Chalisa",
      songPath: "/spotifyClone/songs/song-12.mp3",
      coverImagePath: "/spotifyClone/covers/cover-12.jpg",
    },
  ],
};

function App() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [songdata, setSongData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const songElementRef = useRef(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      setSongData(songJson.song);
    } catch (error) {
      console.error("Error loading song data", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }

    return () => {
      if (songElementRef.current) {
        songElementRef.current.pause();
        songElementRef.current = null;
      }
    };
  }, []);

  function songCardClick(id) {
    setIndex(id);
    songPlay(id);
  }

  function songPlay(id) {
    stopOtherSongs();
    const audio = new Audio(songdata[id].songPath);
    songElementRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
      setSongDuration(audio.duration);
    });

    audio.play();
    document.title = `Spotify - ${songdata[id].songName} `;
    setIsPlaying(true);
  }

  function stopOtherSongs() {
    if (songElementRef.current) {
      songElementRef.current.pause();
      songElementRef.current.currentTime = 0;
      songElementRef.current = null;
    }
  }

  function handleForward() {
    const nextIndex = (index + 1) % songdata.length;
    setIndex(nextIndex);
    songPlay(nextIndex);
  }

  function handleBackward() {
    const prevIndex = (index - 1 + songdata.length) % songdata.length;
    setIndex(prevIndex);
    songPlay(prevIndex);
  }

  function songPlayPause() {
    if (songElementRef.current) {
      if (songElementRef.current.paused) {
        songElementRef.current.play();
        setIsPlaying(true);
      } else {
        songElementRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      songPlay(index);
    }
  }

  function songPLayAhead(value) {
    if (songElementRef.current && isPlaying) {
      const setSongTime = (songDuration * value) / 100;
      songElementRef.current.currentTime = setSongTime;
    }
  }

  return (
    <div>
      <Header />
      <Main
        songData={songdata}
        isLoading={isLoading}
        isPlaying={isPlaying}
        isError={isError}
        songCardClick={songCardClick}
      />

      <Footer
        songPlayPause={songPlayPause}
        isPlaying={isPlaying}
        handleForward={handleForward}
        handleBackward={handleBackward}
        currentTime={currentTime}
        songDuration={songDuration}
        songPLayAhead={songPLayAhead}
      />
    </div>
  );
}

export default App;
