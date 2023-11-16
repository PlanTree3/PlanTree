import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treeId: '',
  treeName: '',
  weekly: {
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
  },
  score: 0,
}

export const mainSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    getMainData: () => {},
    storeIdName: (state, action) => {
      console.log(action.payload)
      state.treeId = action.payload.treeId
      state.treeName = action.payload.treeName
    },
    storeWeeklyData: (state, action) => {
      state.weekly.mon = action.payload.mon
      state.weekly.tue = action.payload.tue
      state.weekly.wed = action.payload.wed
      state.weekly.thu = action.payload.thu
      state.weekly.fri = action.payload.fri
    },
    storeScoreData: (state, action) => {
      state.score = action.payload
    },
  },
})

export const { getMainData, storeIdName, storeWeeklyData, storeScoreData } =
  mainSlice.actions
export default mainSlice.reducer
