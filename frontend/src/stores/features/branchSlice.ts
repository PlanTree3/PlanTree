import { createSlice } from '@reduxjs/toolkit'
import { branchList, budsList, seedsList } from '@/components/Branch/Tasks'

const initialState = {
  // seeds: null,
  // buds: null,
  seeds: seedsList,
  buds: budsList,
  branches: branchList,
  newComments: null,
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
    },
    saveSeeds: (state, action) => {
      state.seeds = action.payload
      console.log('이것이 씨앗이다', state.seeds)
    },
    saveBuds: (state, action) => {
      state.buds = action.payload
      console.log('얘가 봉오리야', state.buds)
    },
    addBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log('bud 생성 검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    addSeeds: (state, action) => {
      state.seeds = action.payload.newSeeds
      console.log('seed 생성 검증 : ', action.payload.newSeeds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    addBranches: (state, action) => {
      state.branches = action.payload.newBranches
      console.log('검증 : ', action.payload.newBranches)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    removeBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log('검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    removeSeeds: (state, action) => {
      state.seeds = action.payload.newSeeds
      console.log('검증 : ', action.payload.newSeeds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    moveBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log('bud 이동 검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    finishedBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log('finished 로직 검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
    },
    finishRejectBuds: (state, action) => {
      state.buds = action.payload.newBuds
      console.log('finished 취소 로직 검증 : ', action.payload.newBuds)
      console.log('서버로 보낼 애 : ', action.payload.createdItem)
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
