import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { FetchUserDataResponse } from '@/types/UserType'
import {
  loginCheck,
  saveUserData,
  fetchUserLogout,
  successUserLogout,
} from '@/stores/features/userSlice'
import { userInfo, userLogout } from '@/apis/member/user'

function* fetchUserDataSaga(): Generator<
  CallEffect | PutEffect,
  void,
  AxiosResponse<FetchUserDataResponse>
> {
  const response: AxiosResponse<unknown> = yield call(userInfo)
  if (response.data) {
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
