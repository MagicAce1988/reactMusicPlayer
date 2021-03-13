import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const libraryStatusHandler = () => setLibraryStatus(!libraryStatus);

  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={libraryStatusHandler}>
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
