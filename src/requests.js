import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

export const apiRequest = axios.create({
  baseURL: BASE_URL,
});

export const uploadFileRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type':
      'multipart/form-data; boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu',
    'Access-Control-Allow-Origin': '*',
  },
});
