import { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import data from './data';
import Library from './components/Library';

function App() {
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song {...{ currentSong }} />
      <Player {...{ currentSong, isPlaying, setIsPlaying, setCurrentSong }} />
      <Library {...{ songs, currentSong, setCurrentSong }} />
    </div>
  );
}

export default App;
