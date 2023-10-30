import { AxiosResponse } from 'axios'
import { apiGet, apiJsonType } from '@/apis/apiConfig'

const oauthURL = import.meta.env.VITE_PUBLIC_OAUTH_SERVER_URL
const getUserDataURL = ''
const updateUserDataURL = ''
const logoutURL = ''

export const loginAPI = async () => apiGet.get(`${oauthURL}`)
export const fetchUserDataAPI = async (): Promise<AxiosResponse> =>
  apiGet.get(`${getUserDataURL}`)
export const userInfoUpdateAPI = async (data: unknown) =>
  apiJsonType.post(`${updateUserDataURL}`, data)
export const LogoutAPI = async () => apiGet.get(`${logoutURL}`)
