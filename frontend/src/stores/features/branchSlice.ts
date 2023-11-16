import { createSlice } from '@reduxjs/toolkit'
import { BranchType, BudsType, SeedsType } from '@/types'

interface BranchStateType {
  isLoading: boolean
  seeds: null | SeedsType[]
  buds: null | BudsType[]
  branches: null | BranchType[]
  newComments: null | number
  degree: number
  complete: number
}
const initialState: BranchStateType = {
  isLoading: false,
  seeds: null,
  buds: null,
  branches: null,
  newComments: null,
  degree: 0,
  complete: 0,
}

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    getBranchData: () => {},
    saveBranches: (state, action) => {
      state.branches = action.payload
    },
    setTreeDegree: (state, action) => {
      state.degree = action.payload.degree
      state.complete = action.payload.complete
    },
    saveSeeds: (state, action) => {
      state.seeds = action.payload
    },
    saveBuds: (state, action) => {
      state.buds = action.payload
      console.log('우효~~', state.buds)
    },
    addBuds: (state, action) => {
      state.buds = action.payload.newBuds
    },
    addSeeds: (state, action) => {
      state.seeds = action.payload.newSeeds
    },
    addBranches: (state, action) => {
      state.branches = action.payload.newBranches
    },
    removeBuds: (state, action) => {
      state.buds = action.payload.newBuds
    },
    removeSeeds: (state, action) => {
      state.seeds = action.payload.newSeeds
    },
    moveBuds: (state, action) => {
      state.buds = action.payload.newBuds
    },
    finishedBuds: (state, action) => {
      state.buds = action.payload.newBuds
    },
    finishRejectBuds: (state, action) => {
      state.buds = action.payload.newBuds
    },
    modifyBranch: (state, action) => {
      state.branches = action.payload.newBuds
    },
    modifyBud: (state, action) => {
      state.buds = action.payload.newBuds
    },
    modifySeed: (state, action) => {
      state.seeds = action.payload.newBuds
    },
  },
})

export const {
  setLoading,
  getBranchData,
  addBuds,
  addSeeds,
  addBranches,
  removeBuds,
  removeSeeds,
  moveBuds,
  saveBranches,
  saveSeeds,
  saveBuds,
  finishedBuds,
  finishRejectBuds,
  modifyBranch,
  modifyBud,
  modifySeed,
  setTreeDegree,
} = branchSlice.actions
export default branchSlice.reducer
