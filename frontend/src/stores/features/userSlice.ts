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
  profileImageUrl: 'public/profile/rabbit.jpg',
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
    loginCheck: () => {
      console.log('logInCheck 들어옴!')
      localStorage.clear()
    },
    saveUserData: (state, action: PayloadAction<any>) => {
      localStorage.clear()
      state.isLoggedIn = true
      state.userData = action.payload
      console.log('유저 정보', action.payload)
    },
    successUserLogout: () => {
      localStorage.clear()
    },
    addProfileImageUrl: (state, action: PayloadAction<string>) => {
      state.userData.profileImageUrl = action.payload
      console.log(
        'userSlice의 profileImgUrl입니다.: ',
        state.userData.profileImageUrl,
      )
    },
    logOutCheck: (state) => {
      console.log('slice의 logoutCheck')
      state.isLoggedIn = false
      state.userData = defaultUser
    },
    addName: (state, action: PayloadAction<string>) => {
      state.userData.name = action.payload
    },
  },
})

export const {
  loginCheck,
  saveUserData,
  successUserLogout,
  addProfileImageUrl,
  logOutCheck,
  addName,
} = userSlice.actions
export default userSlice.reducer
