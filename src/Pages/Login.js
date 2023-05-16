import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLoginMutation } from '../api/endpoints';
import { FaHome } from 'react-icons/fa';

//mui
import Alert from '@mui/material/Alert';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, result] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields must be filled out');
      return;
    }

    try {
      const loginData = await login({
        email,
        password,
      }).unwrap();

      Cookies.set('aToken', loginData.accessToken, { sameSite: 'Lax' });
      Cookies.set('user', loginData.user, { sameSite: 'Lax' });

      navigate('/files');
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
      } else if (err.status === 400) {
        setError(err.data.error);
      } else {
        console.log(err);
        setError('Login failed');
      }
    }
  };
  return (
    <div className='w-10/12 mx-auto h-screen flex flex-col items-center justify-center'>
      <p className='text-4xl font-medium text-blue-500'>Login</p>
      <div className='w-8/12 mx-auto'>
        {error && (
          <Alert severity='error' className='w-4/12 mx-auto mt-2'>
            {error}
          </Alert>
        )}
      </div>
      <form
        className='flex flex-col items-center w-8/12 mt-4'
        onSubmit={handleLogin}
      >
        <input
          className='border-2 rounded w-4/12 h-10 p-2 outline outline-0 focus:border-gray-300'
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          className='border-2 rounded w-4/12 mt-2 h-10 p-2 outline outline-0 focus:border-gray-300'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='border-2 border-blue-500 text-blue-500 w-4/12 rounded mt-2 h-10 hover:text-white hover:bg-blue-500'
        >
          Login
        </button>
        <Link
          to='/'
          className='flex items-center justify-center border-2 border-blue-500 text-blue-500 w-4/12 rounded mt-2 h-10 hover:text-white hover:bg-blue-500'
        >
          <FaHome className='text-2xl' />
        </Link>
      </form>
    </div>
  );
};

export default Login;
