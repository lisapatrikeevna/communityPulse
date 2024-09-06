import { configureStore } from '@reduxjs/toolkit'
// import { questionsApi } from "./questions-api.ts";
import { baseApi } from "./base-api.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { questionsReducer } from "./questionsWrap/questions.slice.ts";

// store.ts
export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer ,
    // [questionsApi.reducerPath]: questionsApi.reducer,
    questions: questionsReducer,
    // responses: responsesApi.reducer,
    // categories: categoriesApi.reducer
  },

})
setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>


