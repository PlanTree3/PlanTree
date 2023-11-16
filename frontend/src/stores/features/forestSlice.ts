import { createSlice } from '@reduxjs/toolkit'

export interface ForestBudType {
  budId: string
  budName: string
  complete: boolean
}
export interface SelectTreeBranch {
  branchId: string
  branchName: string
  buds: ForestBudType[]
  totalBudCount: number
  completedBudCount: number
}
export interface SelectTree {
  treeName: string
  startedAt: string
  endedAt: string
  branches: SelectTreeBranch[]
}
const detailData: SelectTree = {
  treeName: '',
  startedAt: '',
  endedAt: '',
  branches: [],
}

const initialState = {
  forests: null,
  studentForest: null,
  trees: null,
  detailData,
  selectedForest: {
    forestId: null,
    startedAt: null,
    endedAt: null,
  },
  selectTree: '',
  selectedInfo: {
    totalPercent: 0,
    branchNames: [],
    branchTotalCount: [],
    branchDoneCount: [],
    notYet: [],
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
    // saga 감지용 reducer
    getStudentForestData: (_state, _action) => {},
    saveStudentForestData: (state, action) => {
      state.studentForest = action.payload
    },
    getTreesData: (state, action) => {
      state.selectedForest = action.payload
    },
    saveTreesData: (state, action) => {
      state.trees = action.payload
    },
    getTreeDetailData: (state, action) => {
      state.selectTree = action.payload
    },
    saveTreeDetailData: (state, action) => {
      state.detailData = action.payload
    },
    selectedInfoData: (state, action) => {
      state.selectedInfo = action.payload
    },
  },
})

export const {
  getForestData,
  saveForestData,
  getStudentForestData,
  saveStudentForestData,
  getTreesData,
  saveTreesData,
  getTreeDetailData,
  saveTreeDetailData,
  selectedInfoData,
} = forestSlice.actions
export default forestSlice.reducer
