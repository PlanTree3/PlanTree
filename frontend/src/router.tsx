import { Route, Routes } from 'react-router-dom'
import StudentGroupPage from './pages/StudentGroupPage.tsx'
import { Home, LoginPage, OauthRedirectPage } from './pages'
import AtroposPage from './pages/AtroposPage'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/studentGroup" element={<StudentGroupPage />} />
    <Route path="/atropos" element={<AtroposPage />} />
  </Routes>
)

export default RoutesComponent
