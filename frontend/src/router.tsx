import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import LoginPage from './pages/LoginPage.tsx'
import OauthRedirectPage from './pages/OauthRedirectPage.tsx'

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth" element={<OauthRedirectPage />} />
    </Routes>
  )
}

export default RoutesComponent
