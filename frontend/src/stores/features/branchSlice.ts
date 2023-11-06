import { createSlice } from '@reduxjs/toolkit'
import { branchList, budsList, seedsList } from '@/components/Tasks'

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
      state.seeds = action.payload
    },
    addBranches: (state, action) => {
      state.branches = action.payload
    },
  },
})

export const { getBranchData, addBuds, addSeeds, addBranches } = branchSlice.actions
export default branchSlice.reducer
