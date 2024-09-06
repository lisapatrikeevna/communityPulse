import { configureStore } from '@reduxjs/toolkit'
import { questionsApi } from "./questions-api.ts";

// store.ts
export const store = configureStore({
  reducer: {
    [questionsApi.reducerPath]: questionsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(questionsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>


