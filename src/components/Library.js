import LibrarySong from './LibrarySong';

const Library = ({ songs, currentSong, setCurrentSong }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            {...{ song, currentSong, setCurrentSong }}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
