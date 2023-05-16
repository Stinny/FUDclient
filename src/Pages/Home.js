import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
  const currentUser = Cookies.get('user') ? Cookies.get('user') : null;
  const navigate = useNavigate();

  useEffect(() => {
    const checkForUser = () => {
      if (currentUser) navigate('/files');
    };

    checkForUser();
  }, []);
  return (
    <div className='mx-auto w-10/12 flex flex-col items-center'>
      <div className='mt-56 mx-auto flex flex-col items-center'>
        <h2 className='font-medium text-5xl text-blue-500'>FileUpDown</h2>
        <p className='text-xl font-medium text-stone-800 mt-2'>
          Simple cloud storage for your most precious files
        </p>
      </div>

      <Link
        to='/login'
        className='border-2 rounded w-32 h-10 flex items-center justify-center text-blue-500 border-blue-500 mt-8'
      >
        Login
      </Link>

      <Link
        to='/signup'
        className='border-2 rounded w-32 h-10 flex items-center justify-center text-white bg-blue-500 border-blue-500 mt-2'
      >
        Signup
      </Link>
    </div>
  );
};

export default Home;
