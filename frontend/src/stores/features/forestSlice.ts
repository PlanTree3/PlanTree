import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  forests: null,
  trees: null,
  detailData: null,
}

export const forestSlice = createSlice({
  name: 'forest',
  initialState,
  reducers: {
    getForestData: () => {},
    saveForestData: (state, action) => {
      state.forests = action.payload
    },
    getTreesData: () => {},
    saveTreesData: (state, action) => {
      state.trees = action.payload
    },
    getTreeDetailData: () => {},
    saveTreeDetailData: (state, action) => {
      state.detailData = action.payload
    },
  },
})

export const {
  getForestData,
  saveForestData,
  getTreesData,
  saveTreesData,
  getTreeDetailData,
  saveTreeDetailData,
} = forestSlice.actions
export default forestSlice.reducer
