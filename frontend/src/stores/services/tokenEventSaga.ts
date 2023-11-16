import { AxiosError } from 'axios'
import { put, takeLatest } from 'redux-saga/effects'
import { HTTP_STATUS } from '@/types/StatusType'

// 액션 타입 정의
const ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED'
const REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED'

// 액션 생성자 함수 정의
export function accessTokenExpired() {
  return { type: ACCESS_TOKEN_EXPIRED }
}
export function refreshTokenExpired() {
  return { type: REFRESH_TOKEN_EXPIRED }
}

export function* handleTokenError(error: AxiosError) {
  if (error.response) {
    switch (error.response.status) {
      // 추후 토근 만료에 대한 설정이 변경 되면 case 변경
      case HTTP_STATUS.UNAUTHORIZED:
        yield put(accessTokenExpired())
        break
      case HTTP_STATUS.FORBIDDEN:
        yield put(refreshTokenExpired())
        break
      default:
        console.log(error.message)
    }
  }
}

function* handleAccessTokenExpiry() {
  // 액세스 토큰 만료 처리 로직
  // 리프레시 토큰을 사용하여 액세스 토큰 갱신 시도
}
function* handleRefreshTokenExpiry() {
  // 리프레시 토큰 만료 처리 로직
  // 사용자 로그아웃 처리 및 로그인 페이지로 리다이렉트
}

export function* watchTokenEvent() {
  yield takeLatest(ACCESS_TOKEN_EXPIRED, handleAccessTokenExpiry)
  yield takeLatest(REFRESH_TOKEN_EXPIRED, handleRefreshTokenExpiry)
}
