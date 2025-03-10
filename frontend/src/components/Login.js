import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css'; // Updated to match the provided CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users/login', { email, password });
      window.location.href = '/payment'; // Redirect to payment page on successful login
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className={styles['login-body']}>
      <div className={styles['login-container']}>
        <h2 className={styles['login-title']}>Login</h2>
        {error && <p className={styles['login-error']}>{error}</p>}
        <form onSubmit={handleLogin} className={styles['login-form']}>
          <label htmlFor="email" className={styles['login-label']}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles['login-input']}
            required
          />
          <label htmlFor="password" className={styles['login-label']}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles['login-input']}
            required
          />
          <button type="submit" className={styles['login-button']}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
