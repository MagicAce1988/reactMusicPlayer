import { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App">
      <Nav {...{ libraryStatus, setLibraryStatus }} />
      <Song {...{ currentSong }} />
      <Player
        currentSongIndex={songs.findIndex((song) => song.id === currentSong.id)}
        {...{ songs, currentSong, isPlaying, setIsPlaying, setCurrentSong }}
      />
      <Library {...{ songs, currentSong, setCurrentSong, libraryStatus }} />
    </div>
  );
}

export default App;
