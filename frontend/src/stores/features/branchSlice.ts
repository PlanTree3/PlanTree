import { createSlice } from '@reduxjs/toolkit'
import { branchList, budsList, seedsList } from '@/components/Branch/Tasks'

const initialState = {
  // seeds: null,
  // buds: null,
  seeds: seedsList,
  buds: budsList,
  branches: branchList,
}

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    getBranchData: () => {
      console.log('호출을 시작')
    },
    saveBranches: (state, action) => {
      state.branches = action.payload
      console.log(action.payload)
    },
    saveSeeds: (state, action) => {
      state.seeds = action.payload
    },
    saveBuds: (state, action) => {
      state.buds = action.payload
      console.log(action.payload)
    },
    addBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log("bud 생성 검증 : ", action.payload.newBuds)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
    addSeeds: (state, action) => {
      state.seeds = action.payload.newSeeds
      console.log("seed 생성 검증 : ", action.payload.newSeeds)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
    addBranches: (state, action) => {
      state.branches = action.payload.newBranches
      console.log("검증 : ", action.payload.newBranches)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
    removeBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log("검증 : ", action.payload.newBuds)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
    removeSeeds: (state, action) => {
      state.seeds = action.payload.newSeeds
      console.log("검증 : ", action.payload.newSeeds)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
    moveBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log("bud 이동 검증 : ", action.payload.newBuds)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
  },
})

export const {
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
} = branchSlice.actions
export default branchSlice.reducer
