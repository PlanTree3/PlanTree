import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  forests: null,
  trees: null,
  detailData: null,
  selectedForest: {
    forestId: null,
    startedAt: null,
    endedAt: null,
  },
  selectTree: null,
  selectedInfo: {
    totalPercent: null,
    branchNames: null,
    branchTotalCount: null,
    branchDoneCount: null,
    notYet: null,
  },
}

export const forestSlice = createSlice({
  name: 'forest',
  initialState,
  reducers: {
    getForestData: () => {},
    saveForestData: (state, action) => {
      state.forests = action.payload
    },
    getTreesData: (state, action) => {
      state.selectedForest = action.payload
      console.log(action.payload)
    },
    saveTreesData: (state, action) => {
      state.trees = action.payload
      console.log('데이터 보여줘', action.payload)
    },
    getTreeDetailData: (state, action) => {
      state.selectTree = action.payload
    },
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
