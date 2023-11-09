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
  profileImageUrl: 'src/asset/profile/rabbit.jpg',
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
      console.log('여기는 userSlice의 loginCheck')

      state.isLoggedIn = true
    },
    fetchReUserData: () => {},
    saveUserData: (state, action: PayloadAction<any>) => {
      console.log('여기는 userSlice의 saveUserData')

      state.userData = action.payload
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
