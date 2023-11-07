import './App.css'
import './firebase'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from './router'
import { SideBar } from './components'

const App = () => (
  <BrowserRouter>
    <div className="main-container">
      <div className="main-page-viewer">
        <RoutesComponent />
      </div>
      <div className="main-side-bar">
        <SideBar />
      </div>
    </div>
  </BrowserRouter>
)
export default App
