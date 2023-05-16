import React, { useEffect } from 'react';
import Upload from '../components/Upload';
import List from '../components/List';
import { useGetFilesQuery } from '../api/endpoints';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Files = () => {
  const navigate = useNavigate();
  const { data: files, isLoading, isSuccess, refetch } = useGetFilesQuery();
  const currentUser = Cookies.get('user') ? Cookies.get('user') : null;

  const handleLogout = (e) => {
    Cookies.remove('user');
    Cookies.remove('accessToken');
    navigate('/');
  };

  useEffect(() => {
    const checkForUser = () => {
      if (!currentUser) navigate('/');
    };

    checkForUser();
    refetch();
  }, []);

  return (
    <div className='max-w-7xl h-screen mx-auto'>
      <div className='w-10/12 mx-auto border-b flex items-center mt-48 justify-between'>
        <div className='flex-col'>
          <h2 className='font-medium text-2xl text-blue-500'>FileUpDown</h2>
          <p className='text-lg font-medium text-stone-800'>
            Upload and download files as you please
          </p>
        </div>

        <div className='flex items-center'>
          <button
            type='button'
            onClick={handleLogout}
            className='border-2 rounded h-10 w-20 text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500'
          >
            Logout
          </button>
        </div>
      </div>
      <div className='w-10/12 flex justify-end mx-auto'>
        <p>{currentUser}</p>
      </div>
      {isLoading ? (
        <p>Getting your files...</p>
      ) : (
        <>
          <Upload refetch={refetch} />
          <List files={files} refetch={refetch} />
        </>
      )}
    </div>
  );
};

export default Files;
