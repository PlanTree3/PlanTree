import Task from "@/components/Tasks.tsx";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  Task
}

export const testDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.Task = action.payload;
    }
  },
})

export const {
  fetchData,
} = testDataSlice.actions
export default testDataSlice.reducer