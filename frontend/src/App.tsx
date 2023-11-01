import './App.css'
import './firebase'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from './router'

const App = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)
export default App
