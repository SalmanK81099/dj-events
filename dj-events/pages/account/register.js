import Layout from '../../components/Layout';
import styles from '../../styles/Register.module.css';
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Link from 'next/dist/client/link';

export default function register() {
  const { register, error } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [passwordConfrim, setPasswordConfrim] = useState('');

  const onChanger = (evt) => {
    console.log(evt.target.name);
    if (evt.target.name !== 'confirmpassword') {
      setUser((preVal) => {
        return {
          ...preVal,
          [evt.target.name]: evt.target.value,
        };
      });
    } else {
      setPasswordConfrim(evt.target.value);
    }
  };
  const onSubmittor = (evt) => {
    evt.preventDefault();
    if (user.password !== passwordConfrim) {
      alert('Passwords do not match');
      return;
    }
    register(user);
  };

  return (
    <Layout>
      <div className={styles.mainContainer}>
        <form onSubmit={onSubmittor}>
          <div className={styles.formGroup}>
            <label htmlFor='username'>Username</label>
            <input
              type='username'
              name='username'
              id='username'
              onChange={onChanger}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={onChanger} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={onChanger}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='confirmpassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmpassword'
              id='confirmpassword'
              onChange={onChanger}
            />
          </div>
          <div className={styles.loginBtnDiv}>
            <input type='submit' />
            <Link href='/account/login'>
              <a>Already a User? Login</a>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
