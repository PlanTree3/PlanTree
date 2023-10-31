export interface UserData {
  id: number
  nickname: string
  email: string
  profileImage: string
}
export interface FetchUserDataResponse {
  userData: UserData
  accessToken: string
  refreshToken: string
}
export interface FetchUserDataPayload {
  code: string
  state: string
  kind: string
}

export interface UpdateUserProfileImage {
  statusCode: number
  message: string
}

export interface UpdateUserName {
  statusCode: number
  message: string
}
