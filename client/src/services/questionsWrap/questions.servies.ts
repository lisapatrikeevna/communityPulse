import { baseApi } from "../base-api.ts";

export type CreatQuestionsArgsType = {
  text: string
  category_id: number
}
export interface QuestionType extends CreatQuestionsArgsType {
  id: number
  text: string
  responses?: any
  created_at: any  //data.now
}

const questionsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createQuestions: builder.mutation<void, CreatQuestionsArgsType>({
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
            url: '/questions/add',
            headers: { 'Content-Type': 'application/json' }
          };

          // Лог перед отправкой запроса
          console.log('Request prepared:', request);

          return request;
        }, invalidatesTags: ['Questions'],
      }),
      // updateDeck: builder.mutation<void, {id: string, body: UpdateDecksArgs}>({
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
      removeQuestion: builder.mutation<void, {id: number}>({
        query(id) {
          return {method: 'DELETE', url: `/questions/${id}`,}
        }, invalidatesTags: ['Questions']
      }),
      // getDeckById: builder.query<GetDecksResponse, GetDeckByIdArgs>({
      //   query: ({id}) => {
      //     return {url: `v1/decks/${id}`,}
      //   },
      // }),
      getDecks: builder.query<QuestionType,  void>({
        query:()=> {
          return { url: '/questions/',}
        }, providesTags: ['Questions'],
      }),
    }
  },
})

// export const {useRemoveDeckMutation, useCreateDeckMutation, useGetDeckByIdQuery, useGetDecksQuery, useUpdateDeckMutation} = decksServiece
export const {useCreateQuestionsMutation ,useGetDecksQuery, useRemoveQuestionMutation} = questionsService

