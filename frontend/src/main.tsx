import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { persist } from '@/stores/store'
import Provider from '@/stores/provider'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <PersistGate loading={null} persistor={persist}>
      <App />
    </PersistGate>
  </Provider>,
)
