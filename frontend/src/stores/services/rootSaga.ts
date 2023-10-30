import { all } from 'redux-saga/effects'
import watchFetchUserData from '@/stores/services/userSaga'
import { watchTokenEvent } from '@/stores/services/tokenEventSaga'

export default function* rootSaga() {
  yield all([watchFetchUserData(), watchTokenEvent()])
}
