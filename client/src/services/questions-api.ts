import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// questions-api.ts

// builder.query принимает 2 generic параметра:
// Первый - результат запроса (данные)
// Второй - аргументы, которые будет принимать хук. Если хук не принимает аргументов нужно указать void ("пустота")


export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',  // Указываем корректный URL для API
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true');
    },
  }),
  endpoints: builder => {
    return {
      getQuestions: builder.query<any, void>({
        query: () => `/questions`,  // Указываем корректный путь для получения вопросов
      }),
    };
  },
});

export const { useGetQuestionsQuery } = questionsApi;






export interface DecksListResponse {
  items: Item[]
  pagination: Pagination
  maxCardsCount: number
}

export interface Pagination {
  totalItems: number
  currentPage: number
  itemsPerPage: number
  totalPages: number
}

export interface Item {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  cover?: string
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export interface Author {
  id: string
  name: string
}