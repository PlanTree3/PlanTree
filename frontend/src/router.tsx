import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import LoginPage from './pages/LoginPage.tsx'
import OauthRedirectPage from './pages/OauthRedirectPage.tsx'
import StudentGroupPage from './pages/StudentGroupPage.tsx'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />G
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/studentGroup" element={<StudentGroupPage />} />
  </Routes>
)

export default RoutesComponent
