import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from "./base-query-with-reauth.ts";

// base-api.ts
// fetchBaseQuery-выполняет функции axios
export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Questions', 'Responses', 'Category'],
  // baseQuery: fetchBaseQuery({
  //   baseUrl:'http://127.0.0.1:5000/api',
  //   credentials: 'include',
  //   // prepareHeaders: headers => {
  //   //   headers.append('x-auth-skip', 'true')
  //   // },
  // }),
  baseQuery: baseQueryWithReauth, endpoints: () => ({}), // refetchOnFocus: true,
})





