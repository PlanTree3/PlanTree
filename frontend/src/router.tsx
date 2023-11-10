import { Route, Routes } from 'react-router-dom'
import StudentGroupPage from './pages/StudentGroupPage.tsx'
import StudentGroupDetailPage from './pages/StudentGroupDetailPage.tsx'
import AdminGroupDetailPage from './pages/AdminGroupDetailPage.tsx'
// import AdminGroupTabPage from './pages/AdminGroupTabPage.tsx'
import AdminGroupPage from './pages/AdminGroupPage.tsx'
import AdminNestPage from './pages/AdminNestPage.tsx'
import AdminGroupRequestPage from './pages/AdminGroupRequestPage.tsx'
import GroupJoinPage from './pages/GroupJoinPage.tsx'

import {
  Home,
  LoginPage,
  OauthRedirectPage,
  SignUpPage,
  MainPage,
  ForestPage,
  WeeklyBudsPage,
  NotFoundPage,
  ForestDetailPage,
  MyPage,
  QuestPage,
  OidcGoogle,
  TreePage,
  Tutorial,
} from './pages'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />

    <Route path="/studentGroup" element={<StudentGroupPage />} />
    <Route path="/studentGroupDetail" element={<StudentGroupDetailPage />} />
    <Route path="/adminNest" element={<AdminNestPage />} />
    {/* <Route path="/adminGroupTab" element={<AdminGroupTabPage />} /> */}
    <Route path="/adminGroup" element={<AdminGroupPage />} />
    <Route path="/adminGroupDetail" element={<AdminGroupDetailPage />} />
    <Route path="/adminGroupRequest" element={<AdminGroupRequestPage />} />
    {/* QR 연결 페이지 **그룹/둥지 아이디 덧붙여야함 */}
    <Route path="/groupJoin" element={<GroupJoinPage />} />

    <Route path="/signUp" element={<SignUpPage />} />
    <Route path="/oidc/google" element={<OidcGoogle />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/forest" element={<ForestPage />} />
    <Route path="/forest/:id" element={<ForestDetailPage />} />
    <Route path="/tree/:id" element={<TreePage />} />
    <Route path="/branch" element={<WeeklyBudsPage />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/quest" element={<QuestPage />} />
    <Route path="*" element={<NotFoundPage />} />

    <Route path="/tutorial" element={<Tutorial />} />
  </Routes>
)

export default RoutesComponent