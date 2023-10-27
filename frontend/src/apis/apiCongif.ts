import axios from 'axios'
import { HTTP_STATUS } from '../types/StatusType.ts'

const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
export const apiJsonType = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
export const apiGet = axios.create({
  baseURL,
})
export const apiPostJson = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiGet.interceptors.request.use()
apiGet.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === HTTP_STATUS.UNAUTHORIZED) {
      console.log('접근 권한이 없습니다.')
    } else if (
      error.response &&
      error.response.status === HTTP_STATUS.FORBIDDEN
    ) {
      console.log('만료된 토큰 로직 처리 ㄱㄱ')
    }
    return Promise.reject(error)
  },
)
