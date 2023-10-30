import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '@/stores/services/rootSaga'
import {dataReducer, userReducer} from '@/stores/features'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
