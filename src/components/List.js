import React, { useEffect, useState } from 'react';
import { apiRequest } from '../requests';
import moment from 'moment';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import { useDeleteFileMutation } from '../api/endpoints';
import Cookies from 'js-cookie';

const List = ({ files, isLoading, refetch }) => {
  const [deleteFile, result] = useDeleteFileMutation();

  const handleDelete = async (fileId) => {
    try {
      const deleteFileReq = await deleteFile({ fileId }).unwrap();

      if (deleteFileReq === 'File deleted') refetch();
    } catch (err) {}
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content =
      files.length > 0 ? (
        <div className='flex flex-col w-8/12 mx-auto mt-6 bg-white drop-shadow-md p-2 rounded border'>
          <p className='text-2xl font-medium'>Your files</p>
          <div className='w-full flex justify-between p-2'>
            <div className='w-6/12'>
              <p className='text-gray-400 text-sm'>Name</p>
            </div>
            <div className='w-4/12'>
              <p className='text-gray-400 text-sm'>Uploaded on</p>
            </div>
            <div className='w-2/12 flex justify-end'>
              <p className='text-gray-400 text-sm'>Action</p>
            </div>
          </div>
          {files.map((file) => (
            <div className='flex justify-between items-center w-full border-b p-2'>
              <div className='w-6/12'>
                <p>{file.name}</p>
              </div>
              <div className='w-4/12'>
                <p className='text-sm'>
                  {moment.utc(file.createdAt).format('MMM D, YYYY')}
                </p>
              </div>
              <div className='w-2/12 flex items-center justify-end'>
                <button onClick={(e) => handleDelete(file._id)} type='button'>
                  <FiTrash2 className='text-red-500 text-2xl' />
                </button>
                <a
                  className='text-blue-500 text-2xl ml-4'
                  href={file.url}
                  download
                >
                  <FiDownload />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-6/12 mt-6 mx-auto border rounded h-56 bg-white drop-shadow-md flex items-center justify-center'>
          <p className='font-medium'>No files uploaded</p>
        </div>
      );
  }

  return content;
};

export default List;
