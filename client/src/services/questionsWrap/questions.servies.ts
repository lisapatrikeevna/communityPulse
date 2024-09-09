import { baseApi } from "../base-api.ts";

export type CreatQuestionsArgs = {
  id?: number
  text: string
  responses?: any
  created_at?: any
  category_id?: any
}
const baseUrl = 'http://localhost:5000/api'

const questionsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createQuestions: builder.mutation<void, CreatQuestionsArgs>({
        query: arg => {
          // return {
          //   body: arg,
          //   method: 'POST',
          //   url: `${baseUrl}/questions/add`,
          //   headers: { 'Content-Type': 'application/json' }
          // };
          // Лог аргументов запроса
          console.log('Arguments received in createQuestions:', arg);

          const request = {
            body: JSON.stringify(arg),  // Не забудьте сериализовать тело запроса
            method: 'POST',
            url: `${baseUrl}/questions/add`,
            headers: { 'Content-Type': 'application/json' }
          };

          // Лог перед отправкой запроса
          console.log('Request prepared:', request);

          return request;
        }, invalidatesTags: ['Questions'],
      }), // updateDeck: builder.mutation<void, {id: string, body: UpdateDecksArgs}>({
      //   //pissimistik Update
      //   // onQueryStarted: async({id: string, ...body}, {dispatch, getState, queryFulfilled}) => {
      //   //   // onQueryStarted:async (arg: QueryArg, api: MutationLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>): Promise<void> | void =>{
      //   //  const state=getState() as RootStateType
      //   //   const currentPage=state.decks.currentPage
      //   //   dispatch(decksServiece.util.updateQueryData('getDecks'), )
      //   //
      //   //   await queryFulfilled
      //   // },
      //   query: ({id, body}) => {
      //     return {
      //       body, method: 'PATCH', url: `v1/decks/${id}`,
      //     }
      //   }, invalidatesTags: ['Decks']
      // }),
      // removeDeck: builder.mutation<void, {id: string}>({
      //   query(id) {
      //     return {method: 'DELETE', url: `v1/decks/${id}`,}
      //   }, invalidatesTags: ['Decks']
      // }),
      // getDeckById: builder.query<GetDecksResponse, GetDeckByIdArgs>({
      //   query: ({id}) => {
      //     return {url: `v1/decks/${id}`,}
      //   },
      // }),
      // getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
      //   query: args => {
      //     return {params: args ?? {}, url: `v1/decks`,}
      //   }, providesTags: ['Decks'],
      // }),
    }
  },
})

// export const {useRemoveDeckMutation, useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery, useUpdateDeckMutation} = decksServiece
export const {useCreateQuestionsMutation} = questionsService

