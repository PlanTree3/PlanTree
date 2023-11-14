import { createSlice } from '@reduxjs/toolkit'
import { branchList, budsList, seedsList } from '@/components/Branch/Tasks'

const initialState = {
  isLoading: false,
  seeds: seedsList,
  buds: budsList,
  branches: branchList,
  newComments: null,
}

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      console.log('로딩중이라고!', action.payload)
      state.isLoading = action.payload
    },
    getBranchData: () => {},
    saveBranches: (state, action) => {
      state.branches = action.payload
    },
    saveSeeds: (state, action) => {
      state.seeds = action.payload
    },
    saveBuds: (state, action) => {
      state.buds = action.payload
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
    modifyBranch: (state, action) => {
      state.branches = action.payload.newBuds
      console.log('finished 취소 로직 검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    modifyBud: (state, action) => {
      state.buds = action.payload.newBuds
      console.log('finished 취소 로직 검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    modifySeed: (state, action) => {
      state.seeds = action.payload.newBuds
      console.log('finished 취소 로직 검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
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
} = branchSlice.actions
export default branchSlice.reducer
