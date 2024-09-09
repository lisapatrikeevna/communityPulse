import { baseApi } from "../base-api.ts";


export type CategoryType = {
  id: number
  name: string
}
export type CreatCategoryArgs = {
  name: string
}
// const baseUrl = 'http://localhost:5000/api'
const baseUrl = 'http://127.0.0.1:5000/api/category'

const categoryService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCategory: builder.mutation<void, CreatCategoryArgs>({
        query: arg => {
          // return {
          //   body: arg,
          //   method: 'POST',
          //   url: `${baseUrl}/questions/add`,
          //   headers: { 'Content-Type': 'application/json' }
          // };
          // Лог аргументов запроса
          console.log('Arguments received in createCategory:', arg);

          const request = {
            body: JSON.stringify(arg),  // Не забудьте сериализовать тело запроса
            method: 'POST',
            url: `${baseUrl}/add`,
            headers: { 'Content-Type': 'application/json' }
          };

          // Лог перед отправкой запроса
          console.log('Request prepared:', request);

          return request;
        }, invalidatesTags: ['Questions'],
      }),
      updateCategory: builder.mutation<void, {id: string, body: string}>({
        //pissimistik Update
        // onQueryStarted: async({id: string, ...body}, {dispatch, getState, queryFulfilled}) => {
        //   // onQueryStarted:async (arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void =>{
        //  const state=getState() as RootStateType
        //   const currentPage=state.decks.currentPage
        //   dispatch(decksServiece.util.updateQueryData('getDecks'), )
        //
        //   await queryFulfilled
        // },
        query: ({id, body}) => {
          return {
            body, method: 'PATCH', url: `${baseUrl}/${id}`,
          }
        }, invalidatesTags: ['Category']
      }),
      removeCategory: builder.mutation<void, {id: string}>({
        query(id) {
          return {method: 'DELETE', url: `${baseUrl}/${id}`,}
        }, invalidatesTags: ['Category']
      }),
      getCategory: builder.query<any,any | void>({
      // getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        query: () => {
          return {method: 'GET', url: `${baseUrl}/`,}
        }, providesTags: ['Category'],
      }),
    }
  },
})

// export const {useRemoveDeckMutation, useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery, useUpdateDeckMutation} = decksServiece
export const {useCreateCategoryMutation, useGetCategoryQuery} = categoryService

