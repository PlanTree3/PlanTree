import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from './router.tsx'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
      <div>진짜 린트 개새끼야</div>
    </>
  )
}
export default App
