import { baseApi } from "../base-api.ts";


export interface ResponseType extends CreatResponseArgs{
  id: number
}
export type CreatResponseArgs = {
  text: string
  question_id:number
  is_agree:boolean
}
export type GetResponsesType = {
  agree_count: number;
  disagree_count: number;
  question_id: number;
  responses: Array<ResponseDetailType>;
};

export interface ResponseDetailType {
  id: number;
  is_agree: boolean;
  text: string;
}

const responseService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createResponse: builder.mutation<void, CreatResponseArgs>({
        query: arg => {
          return {
            body: JSON.stringify(arg),
            method: 'POST',
            url: 'responses/add',
            headers: { 'Content-Type': 'application/json' }
          };
        }, invalidatesTags: ['Response'],
      }),
      updateResponse: builder.mutation<void, {body: ResponseType}>({
        query: body => {
          return {
            body:JSON.stringify(body), method: 'PUT', url: `/responses/update/${body.id}`, headers: { 'Content-Type': 'application/json'}
          }
        }, invalidatesTags: ['Response']
      }),
      removeResponse: builder.mutation<void, {id: number}>({
        query(id) {
          return {method: 'DELETE', url: `responses/delete/${id}`,}
        }, invalidatesTags: ['Response']
      }),
      getResponse: builder.query<GetResponsesType | void>({
        query: () => {
          return {method: 'GET', url: '/responses/',}
        }, providesTags: ['Response'],
      }),
    }
  },
})

export const {useCreateResponseMutation, useGetResponseQuery, useRemoveResponseMutation, useUpdateResponseMutation} = responseService

