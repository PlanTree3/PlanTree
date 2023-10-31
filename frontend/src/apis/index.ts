import axios, { AxiosInstance } from 'axios'
import { HTTP_STATUS } from '@/types/StatusType'
import { userRefresh } from './member'

const API_URL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL

const apiInstance = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json,',
    },
  })
  return instance
}

const formApiInstance = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
      Accept: 'application/json,',
    },
  })
  return instance
}

const authInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use()
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
        // 401일 경우 access token 재 발급
        try {
          userRefresh()
        } catch {
          console.error('response error : ', error)
          return Promise.reject(error)
        }
      }
      console.error('response error : ', error)
      return Promise.reject(error)
    },
  )
  return instance
}

const authApiInstance = () => {
  return authInterceptor(apiInstance())
}

const authFormInstance = () => {
  return authInterceptor(formApiInstance())
}

const api = apiInstance()
const formApi = formApiInstance()
const authApi = authApiInstance()
const authFormApi = authFormInstance()

export { api, authApi, formApi, authFormApi }

export * from './member'
export * from './forest'
export * from './communication'
