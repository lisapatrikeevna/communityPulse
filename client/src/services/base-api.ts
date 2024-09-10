import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from "./base-query-with-reauth.ts";

// base-api.ts
// fetchBaseQuery-выполняет функции axios
export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Questions', 'Responses', 'Category'],
  baseQuery: baseQueryWithReauth, endpoints: () => ({}),
})





