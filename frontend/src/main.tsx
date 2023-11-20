import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import { isMobile } from 'react-device-detect'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { persist } from '@/stores/store'
import Provider from '@/stores/provider'
import App from './App'

const backendForDND = isMobile ? TouchBackend : HTML5Backend
const backendOptions = {
  delayTouchStart: 200,
  enableMouseEvents: true,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <PersistGate loading={null} persistor={persist}>
      <DndProvider backend={backendForDND} options={backendOptions}>
        <App />
      </DndProvider>
    </PersistGate>
  </Provider>,
)
