import { Route, Routes } from 'react-router-dom'
import { Home, LoginPage, OauthRedirectPage } from './pages'
import AtroposPage from './pages/AtroposPage'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/atropos" element={<AtroposPage />} />
  </Routes>
)

export default RoutesComponent
