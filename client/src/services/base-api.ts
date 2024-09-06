import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from "./base-query-with-reauth.ts";

// fetchBaseQuery-выполняет функции axios
export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Questions', 'Responses', 'Cards'], // baseQuery: fetchBaseQuery({
  //   baseUrl: 'https://api.flashcards.andrii.es',
  //   credentials: 'include',
  //   // prepareHeaders: headers => {
  //   //   headers.append('x-auth-skip', 'true')
  //   // },
  // }),
  baseQuery: baseQueryWithReauth, endpoints: () => ({}), // refetchOnFocus: true,
})
