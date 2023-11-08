import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/types/UserType'

export interface UserState {
  isLoading: boolean
  isLoggedIn: boolean
  userData: UserData
  error: Error | null
}
const defaultUser: UserData = {
  id: 192874278348,
  nickname: '요 정 출 현',
  email: 'testman@ssafy.com',
  profileImage: 'https://i.ibb.co/822DPdb/rabbit.jpg',
}
const initialState: UserState = {
  isLoading: true,
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
    fetchUserData: (state) => {
      state.isLoading = true
    },
    fetchReUserData: () => {},
    saveUserData: (state, action: PayloadAction<any>) => {
      const { nickname, profileImage } = action.payload
      state.userData.nickname = nickname
      state.userData.profileImage = profileImage
    },
    fetchUserLogout: () => {},
    successUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = defaultUser
      localStorage.clear()
    },
  },
})

export const {
  loginCheck,
  fetchUserData,
  saveUserData,
  fetchUserLogout,
  successUserLogout,
} = userSlice.actions
export default userSlice.reducer
