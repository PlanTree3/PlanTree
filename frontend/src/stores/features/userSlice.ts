import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/types/UserType'

export interface UserState {
  isLoading: boolean
  isLoggedIn: boolean
  userData: UserData
  accessToken: string | null
  refreshToken: string | null
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
    saveUserData: (state, action: PayloadAction<any>) => {
      const { nickname, profileImage } = action.payload
      state.userData.nickname = nickname
      state.userData.profileImage = profileImage
    },
    fetchUserLogout: () => {},
    successUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = defaultUser
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const {
  fetchUserData,
  saveUserData,
  fetchUserLogout,
  successUserLogout,
} = userSlice.actions
export default userSlice.reducer
