import Layout from '../../components/Layout';
import styles from '../../styles/Login.module.css';
import { useState, useContext, useEffec, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import Link from 'next/link';

export default function login() {
  const { login, error } = useContext(AuthContext);
  useEffect(() => error && alert(error));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChanger = (evt) => {
    evt.target.name == 'email'
      ? setEmail(evt.target.value)
      : setPassword(evt.target.value);
  };
  const onSubmittor = (evt) => {
    evt.preventDefault();
    login({ email, password });
  };

  return (
    <Layout>
      <div className={styles.mainContainer}>
        <form onSubmit={onSubmittor}>
          <div className={styles.formGroup}>
            <label htmlFor='email'>Username/Email</label>
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
          <div className={styles.loginBtnDiv}>
            <input type='submit' />
            <Link href='/account/register'>
              <a>Not a User? Register</a>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
