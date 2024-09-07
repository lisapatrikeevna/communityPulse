import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from "./base-query-with-reauth.ts";

// base-api.ts
// fetchBaseQuery-выполняет функции axios
export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Questions', 'Responses', 'Cards'], // baseQuery: fetchBaseQuery({
    // baseUrl:'http://localhost:5000/api',
  //   baseUrl: 'https://api.flashcards.andrii.es',
  //   credentials: 'include',
  //   // prepareHeaders: headers => {
  //   //   headers.append('x-auth-skip', 'true')
  //   // },
  // }),
  baseQuery: baseQueryWithReauth, endpoints: () => ({}), // refetchOnFocus: true,
})
