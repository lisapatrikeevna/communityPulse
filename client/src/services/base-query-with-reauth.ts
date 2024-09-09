import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';


// base-query-with-reauth.ts
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:5000/api/',
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    return await baseQuery(args, api, extraOptions);
  } catch (error) {
    console.error('Error during base query:', error);
    throw error;
  }
};


