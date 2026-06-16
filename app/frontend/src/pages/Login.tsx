import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../styles/login.module.css';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: login, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Успешный вход:', user);
        navigate('/admin');
      } else {
        alert('Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <div className={s.overlay}>
      <form className={s.loginCard + ' card'} onSubmit={handleSubmit}>
        <p className='row'>
          <label htmlFor='login'>Логин</label>
          <input 
            id="login" 
            type="text" 
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </p>
        <p className='row'>
          <label htmlFor="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>
        <button type="submit" className={s.submitButton}>Войти</button>
      </form>
    </div>
  );
}

export default Login;
