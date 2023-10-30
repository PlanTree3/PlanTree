import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/types/UserType'

interface UserState {
  isLoading: boolean
  isLoggedIn: boolean
  userData: UserData | null
  accessToken: string | null
  refreshToken: string | null
  error: Error | null
}
const initialState: UserState = {
  isLoading: true,
  isLoggedIn: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserData: (state) => {
      state.isLoading = true
    },
    fetchReUserData: () => {},
    fetchUserDataSuccess: (state, action: PayloadAction<unknown>) => {
      console.log(state)
      console.log(action.payload)
    },
    fetchReUserDataSuccess: (state, action) => {
      console.log(state)
      console.log(action.payload)
    },
    fetchUserLogout: () => {},
    successUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const {
  fetchUserData,
  fetchUserDataSuccess,
  fetchUserLogout,
  successUserLogout,
} = userSlice.actions
export default userSlice.reducer
