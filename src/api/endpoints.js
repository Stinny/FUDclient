import { apiSlice } from './apiSlice';

export const endpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, password }) => ({
        url: '/register',
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    create: builder.mutation({
      query: (file) => ({
        url: '/create',
        method: 'POST',
        body: {
          file: file,
        },
      }),
    }),
    deleteFile: builder.mutation({
      query: ({ fileId }) => ({
        url: '/delete',
        method: 'POST',
        body: {
          fileId: fileId,
        },
      }),
    }),
    getFiles: builder.query({
      query: () => '/files',
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
} = endpoints;
