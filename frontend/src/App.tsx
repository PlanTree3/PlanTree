import './App.scss'
import './firebase'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from './router'
import { SideBar } from './components'
// import LoginCheck from '@/components/LoginCheck.tsx'

const App = () => (
  <BrowserRouter>
    {/*<LoginCheck />*/}
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
