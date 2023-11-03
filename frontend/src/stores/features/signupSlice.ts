import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
  name: null,
  birthday: null,
  role: null,
  profileImg: null,
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    addBirthday: (state, action: PayloadAction<Date>) => {
      state.birthday = action.payload
    },
    addRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    addProfileImg: (state, action: PayloadAction<string>) => {
      state.profileImg = action.payload
    },
  },
})

export const { addName, addBirthday, addRole, addProfileImg } =
  signupSlice.actions
export default signupSlice.reducer
