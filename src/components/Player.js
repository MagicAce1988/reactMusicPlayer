import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  songs,
  currentSong,
  currentSongIndex,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
}) => {
  // State

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Refs

  const audioRef = useRef(null);

  // Variables

  const percentagePlayed = (songInfo.currentTime / songInfo.duration) * 100;

  const transformStyle = {
    transform: `translateX(${percentagePlayed}%)`,
  };

  // Event Handlers

  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    audioRef.current[isPlaying ? 'pause' : 'play']();
  };

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const metaDataHandler = (e) => {
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, duration });
  };

  const dragHandler = (e) => {
    const currentTime = e.target.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const skipTrackHandler = (direction) => {
    let newIndex = (currentSongIndex + direction + 1 || songs.length) - 1;
    setCurrentSong(songs[newIndex % songs.length]);
  };

  // utils

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = `0${Math.floor(time % 60)}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  // effects

  useEffect(() => {
    if (isPlaying) {
      var playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log(error);
        });
      }
    }
  }, [isPlaying, currentSong]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            type="range"
          />
          <div className="animate-track" style={transformStyle}></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(-1)}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(1)}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={metaDataHandler}
          ref={audioRef}
          src={currentSong.audio}
        ></audio>
      </div>
    </div>
  );
};

export default Player;
