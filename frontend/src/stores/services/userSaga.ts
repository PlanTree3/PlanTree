import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { FetchUserDataResponse } from '@/types/UserType'
import {
  loginCheck,
  saveUserData,
  fetchUserLogout,
  successUserLogout,
} from '@/stores/features/userSlice'
import { userInfo, userLogout } from '@/apis/member/user'
import { handleTokenError } from '@/stores/services/tokenEventSaga'

function* fetchUserDataSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  console.log('사가 실행되고 있음???')
  const response: AxiosResponse<unknown> = yield call(userInfo)
  if (response.data) {
    console.log('data: ', response.data)
    // 여기서 saveUserData 액션을 dispatch 합니다.
    yield put(saveUserData(response.data))
  }
}

function* fetchUserLogoutSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const response: AxiosResponse<unknown> = yield call(userLogout)
  if (response) {
    yield put(successUserLogout())
    sessionStorage.clear()
  }
}

export function* watchFetchUserData() {
  yield takeLatest(loginCheck.type, fetchUserDataSaga)
  yield takeLatest(fetchUserLogout.type, fetchUserLogoutSaga)
}
