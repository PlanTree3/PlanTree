import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import rootSaga from '@/stores/services/rootSaga'
import {
  branchReducer,
  userReducer,
  signupReducer,
  questReducer,
  mainReducer,
  forestReducer,
} from '@/stores/features'

const userPersistConfig = {
  key: 'user',
  storage,
}

const signupPersistConfig = {
  key: 'signup',
  storage,
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
const persistSignupReducer = persistReducer(signupPersistConfig, signupReducer)

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    branch: branchReducer,
    signup: persistSignupReducer,
    quest: questReducer,
    main: mainReducer,
    forest: forestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export const persistor: any = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
