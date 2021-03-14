import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const libraryStatusHandler = () => setLibraryStatus(!libraryStatus);

  const navStyle =
    window.innerWidth < 768 && libraryStatus
      ? {
          position: 'absolute',
          right: '20px',
        }
      : {};

  return (
    <nav>
      <h1>Waves</h1>
      <button style={navStyle} onClick={libraryStatusHandler}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
