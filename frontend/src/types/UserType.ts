export interface UserData {
  role: string
  name: string
  profileImageUrl: string
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
