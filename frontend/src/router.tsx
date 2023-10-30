import { Route, Routes } from 'react-router-dom'
import StudentGroupPage from './pages/StudentGroupPage.tsx'
import { Home, LoginPage, OauthRedirectPage } from './pages'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/studentGroup" element={<StudentGroupPage />} />
  </Routes>
)

export default RoutesComponent
