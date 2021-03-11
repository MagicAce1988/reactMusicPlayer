import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // State

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Refs

  const audioRef = useRef(null);

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

  // utils

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = `0${Math.floor(time % 60)}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  // effects

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying, currentSong]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
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
