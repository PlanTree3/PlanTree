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
    loginCheck: (state) => {
      state.isLoggedIn = true
    },
    fetchReUserData: () => {},
    saveUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
    },
    fetchUserLogout: () => {},
    successUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = defaultUser
      localStorage.clear()
    },
    addProfileImageUrl: (state, action: PayloadAction<any>) => {
      state.userData.profileImageUrl = action.payload
      console.log(
        'userSlice의 profileImgUrl입니다.: ',
        state.userData.profileImageUrl,
      )
    },
  },
})

export const {
  loginCheck,
  saveUserData,
  fetchUserLogout,
  successUserLogout,
  addProfileImageUrl,
} = userSlice.actions
export default userSlice.reducer
