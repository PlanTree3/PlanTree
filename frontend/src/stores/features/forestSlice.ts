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

interface TreeData {
  treeId: string
  treeName: string
  startedAt: string
  endedAt: string
  totalBudCount: number
  completedBudCount: number
}
interface Forest {
  endedAt: string
  startedAt: string
  forestId: string
}
interface ForestData {
  forests: Forest[]
  studentForest: []
  trees: TreeData[]
  detailData: SelectTree
  selectedForest: {
    forestId: string
    startedAt: string
    endedAt: string
  }
  selectTree: string
  selectedInfo: {
    totalPercent: number
    branchNames: []
    branchTotalCount: []
    branchDoneCount: []
    notYet: []
  }
}

const initialState: ForestData = {
  forests: [],
  studentForest: [],
  trees: [],
  detailData,
  selectedForest: {
    forestId: '',
    startedAt: '',
    endedAt: '',
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
