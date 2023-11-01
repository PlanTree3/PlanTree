import { Route, Routes } from 'react-router-dom'
import StudentGroupPage from './pages/StudentGroupPage.tsx'
import {
  Home,
  LoginPage,
  OauthRedirectPage,
  SignUpPage,
  MainPage,
  ForestPage,
  WeeklyBudsPage,
} from './pages'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/studentGroup" element={<StudentGroupPage />} />
    <Route path="/signUp" element={<SignUpPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/forest" element={<ForestPage />} />
    <Route path="budsTest" element={<WeeklyBudsPage />} />
  </Routes>
)

export default RoutesComponent
