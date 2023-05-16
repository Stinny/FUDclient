import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://fileupdown.herokuapp.com//api',
  prepareHeaders: (headers) => {
    const aToken = Cookies.get('aToken') ? Cookies.get('aToken') : null;

    if (aToken) {
      headers.set('Authorization', `Bearer ${aToken}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
