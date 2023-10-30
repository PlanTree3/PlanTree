import { Route, Routes } from 'react-router-dom'
import { Home, LoginPage, OauthRedirectPage } from './pages'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
  </Routes>
)

export default RoutesComponent
