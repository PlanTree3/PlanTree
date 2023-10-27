import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import LoginPage from './pages/LoginPage.tsx'
import OauthRedirectPage from './pages/OauthRedirectPage.tsx'
import GroupStudentPage from './pages/GroupPage.tsx'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/groupStudent" element={<GroupStudentPage />} />
  </Routes>
)

export default RoutesComponent
