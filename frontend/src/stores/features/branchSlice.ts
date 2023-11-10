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
    getBranchData: (state, action) => {
      console.log(state)
      console.log(action)
    },
    addBuds: (state, action) => {
      state.buds = action.payload
    },
    addSeeds: (state, action) => {
      state.seeds = action.payload.newSeeds
      console.log("검증 : ", action.payload.newSeeds)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
    addBranches: (state, action) => {
      state.branches = action.payload.newBranches
      console.log("검증 : ", action.payload.newBranches)
      console.log("서버로 보낼 애 : ", action.payload.createdItem)
    },
  },
})

export const { getBranchData, addBuds, addSeeds, addBranches } = branchSlice.actions
export default branchSlice.reducer
