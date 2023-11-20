import { all } from 'redux-saga/effects'
import { watchFetchUserData } from '@/stores/services/userSaga'
import { watchBranchData } from '@/stores/services/branchSaga.ts'
import { watchMainData } from '@/stores/services/mainSaga.ts'
import { watchForestData } from '@/stores/services/forestSaga.ts'
import { watchQuestData } from '@/stores/services/questSaga.ts'

export default function* rootSaga() {
  yield all([
    watchFetchUserData(),
    watchBranchData(),
    watchMainData(),
    watchForestData(),
    watchQuestData(),
  ])
}
