import React, { useState } from 'react';
import { uploadFileRequest } from '../requests';
import { useCreateMutation } from '../api/endpoints';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const Upload = ({ refetch }) => {
  const [file, setFile] = useState([]);
  const [error, setError] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [create, result] = useCreateMutation();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const files = new FormData();

    setUploading(true);

    for (let i = 0; i < file.length; i++) {
      files.append('digitalProducts', file[i]); //appends actual file object to form data
    }

    try {
      const uploadReq = await uploadFileRequest.post('/upload', files);

      if (uploadReq.data.files.length) {
        const createFileOnServerReq = await create(
          uploadReq.data.files[0]
        ).unwrap();

        if (createFileOnServerReq === 'File created') {
          setFile([]);
          refetch();
          setUploading(false);
        }
      } else {
      }
    } catch (err) {
      setUploading(false);
      console.log(err);
    }
  };

  return (
    <div className='w-6/12 mx-auto mt-4'>
      <form>
        {file.length ? (
          <button
            className='w-full rounded font-medium text-blue-500 border-2 border-blue-500 h-12 hover:bg-blue-500 hover:text-white mb-2'
            onClick={handleFileUpload}
            type='button'
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        ) : (
          ''
        )}
        <FilePond
          files={file}
          onupdatefiles={(fileItems) => {
            setFile(fileItems.map((fileItem) => fileItem.file));
          }}
          name='productFile'
        />
      </form>
    </div>
  );
};

export default Upload;
