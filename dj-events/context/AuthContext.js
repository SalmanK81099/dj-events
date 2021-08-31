import { useState, createContext, useEffect } from 'react';
import { API_URL } from '../config/index';
import { useRouter } from 'next/dist/client/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => checkUserLoggedIn(), []);

  //Register
  const register = async (user) => {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    });
    const data = await res.json();
    alert(data.message);
  };
  //Login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
    } else {
      setError(data.message);
      setError(null);
    }
  };

  //Logout
  const logout = async () => {
    console.log('logout');
  };
  //Check Login

  const checkUserLoggedIn = async (user) => {
    const res = await fetch('http://localhost:3000/api/user');
    const data = await res.json();
    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
