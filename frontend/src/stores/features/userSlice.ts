import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/types/UserType'

export interface UserState {
  isLoggedIn: boolean
  userData: UserData
  error: Error | null
}
const defaultUser: UserData = {
  role: 'STUDENT',
  name: '요 정 출 현',
  profileImageUrl: 'public/asset/profile/rabbit.jpg',
}
const initialState: UserState = {
  isLoggedIn: false,
  userData: defaultUser,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginCheck: (state) => {
      state.isLoggedIn = true
    },
    fetchReUserData: () => {},
    saveUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
      console.log("유저 정보", action.payload)
    },
    fetchUserLogout: () => {},
    successUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = defaultUser
      localStorage.clear()
    },
  },
})

export const { loginCheck, saveUserData, fetchUserLogout, successUserLogout } =
  userSlice.actions
export default userSlice.reducer
