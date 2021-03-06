import {
  faAngleLeft,
  faAngleRight,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // Refs

  const audioRef = useRef(null);

  // Event Handlers

  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    audioRef.current[isPlaying ? 'pause' : 'play']();
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
        <audio ref={audioRef} src={currentSong.audio}></audio>
      </div>
    </div>
  );
};

export default Player;
