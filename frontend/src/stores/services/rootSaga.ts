import { all } from 'redux-saga/effects'
// import watchFetchUserData from '@/stores/services/userSaga'
import { watchTokenEvent } from '@/stores/services/tokenEventSaga'
import { watchFetchUserData } from '@/stores/services/userSaga'

export default function* rootSaga() {
  yield all([watchTokenEvent()])
  yield all([watchFetchUserData()])
}
