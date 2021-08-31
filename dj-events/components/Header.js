import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Search from './Search';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.mainContainer}>
      <div>
        <Link href='/'>
          <h1>DJ EVENTS</h1>
        </Link>
      </div>
      <Search />
      <div className={styles.menuRight}>
        <Link href='/events'>
          <h2>Events</h2>
        </Link>
        {user ? (
          <>
            {' '}
            <Link href='/events/add'>
              <h2>Add Event</h2>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href='/account/login'>
              <h2 className={styles.logintbn}>
                <FaArrowCircleRight />
                Login
              </h2>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
