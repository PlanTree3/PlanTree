import { Provider } from 'react-redux'
import React from 'react'
import { store } from './store'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

export default Providers
