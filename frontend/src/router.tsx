import { Route, Routes } from 'react-router-dom'
import StudentGroupPage from './pages/StudentGroupPage.tsx'
import AdminGroupPage from './pages/AdminGroupPage.tsx'
import {
  Home,
  LoginPage,
  OauthRedirectPage,
  SignUpPage,
  MainPage,
  ForestPage,
} from './pages'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/studentGroup" element={<StudentGroupPage />} />
    <Route path="/adminGroup" element={<AdminGroupPage />} />
    <Route path="/signUp" element={<SignUpPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/forest" element={<ForestPage />} />
  </Routes>
)

export default RoutesComponent
