import { Route, Routes } from 'react-router-dom'
import StudentGroupPage from './pages/StudentGroupPage.tsx'
import StudentGroupDetailPage from './pages/StudentGroupDetailPage.tsx'
import AdminGroupDetailPage from './pages/AdminGroupDetailPage.tsx'
import AdminGroupTabPage from './pages/AdminGroupTabPage.tsx'
import AdminNestPage from './pages/AdminNestPage.tsx'

import {
  Home,
  LoginPage,
  OauthRedirectPage,
  SignUpPage,
  MainPage,
  ForestPage,
  WeeklyBudsPage,
  NotFoundPage,
} from './pages'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />

    <Route path="/studentGroup" element={<StudentGroupPage />} />
    <Route path="/studentGroupDetail" element={<StudentGroupDetailPage />} />
    <Route path="/adminNest" element={<AdminNestPage />} />
    <Route path="/adminGroupTab" element={<AdminGroupTabPage />} />
    <Route path="/adminGroupDetail" element={<AdminGroupDetailPage />} />

    <Route path="/signUp" element={<SignUpPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/forest" element={<ForestPage />} />
    <Route path="budsTest" element={<WeeklyBudsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default RoutesComponent
