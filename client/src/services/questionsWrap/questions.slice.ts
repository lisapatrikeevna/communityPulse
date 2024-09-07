import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  // perPage: 10,
  // currentPage: 1,
  // searchByName: '',
  // // currentTab:'all' as Tab,
  // currentTab:'all',
  // maxCards: undefined as number | undefined,
  // minCards: 0,
  // search:'',
}

export const questionsSlice = createSlice({
  initialState,
  name: 'questionsSlice',
  reducers: {
    // setPerPage: (state, action: PayloadAction<number>) => {
    //   state.perPage = action.payload
    // },
    // resetFilters: (state, action: PayloadAction<number>) => {
    //   state.search = ''
    //   state.currentTab = 'all'
    //   state.minCards=0
    //   state.maxCards=undefined
    // },
    // setCurrentPage: (state, action: PayloadAction<number>) => {
    //   state.currentPage = action.payload
    // },
    // setSearchByName: (state, action: PayloadAction<string>) => {
    //   state.searchByName = action.payload
    // },
  },
})

export const questionsAC=questionsSlice.actions
export const questionsReducer=questionsSlice.reducer