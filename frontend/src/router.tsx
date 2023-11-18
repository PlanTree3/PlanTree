import { Route, Routes } from 'react-router-dom'
import StudentGroupPage from './pages/StudentGroupPage.tsx'
import StudentGroupDetailPage from './pages/StudentGroupDetailPage.tsx'
import AdminGroupDetailPage from './pages/AdminGroupDetailPage.tsx'
import AdminGroupPage from './pages/AdminGroupPage.tsx'
import AdminNestPage from './pages/AdminNestPage.tsx'
import AdminGroupRequestPage from './pages/AdminGroupRequestPage.tsx'
import GroupJoinPage from './pages/GroupJoinPage.tsx'
import NestJoinPage from './pages/NestJoinPage.tsx'
import ForestStudentPage from './pages/ForestPage/ForestStudentPage.tsx'
import WeeklyBudsAdminPage from './pages/WeeklyBudsAdminPage.tsx'

import {
  Home,
  LoginPage,
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
  NewsLetterPage,
} from './pages'

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />

    <Route path="/studentGroup" element={<StudentGroupPage />} />
    <Route
      path="/studentGroupDetail/:groupId"
      element={<StudentGroupDetailPage />}
    />
    <Route path="/adminNest" element={<AdminNestPage />} />
    {/* <Route path="/adminGroupTab" element={<AdminGroupTabPage />} /> */}
    <Route path="/adminGroup" element={<AdminGroupPage />} />
    <Route
      path="/adminGroupDetail/:groupId"
      element={<AdminGroupDetailPage />}
    />
    <Route
      path="/adminGroupRequest/:groupId"
      element={<AdminGroupRequestPage />}
    />
    {/* QR 연결 페이지 **그룹/둥지 아이디 덧붙여야함 */}
    <Route path="/groupJoin/:groupId" element={<GroupJoinPage />} />
    <Route path="/nestJoin/:nestId" element={<NestJoinPage />} />

    <Route path="/signUp" element={<SignUpPage />} />
    <Route path="/oidc/google" element={<OidcGoogle />} />

    {/* 나의 메인 페이지 / 다른 사람의 메인 페이지(id 조회) */}
    <Route path="/main" element={<MainPage />} />
    {/*<Route path="/main/:id" element={<MainPage?? />} />*/}

    <Route path="/forest" element={<ForestPage />} />
    <Route path="/forest/student/:memberId" element={<ForestStudentPage />} />
    <Route path="/forest/:id" element={<ForestDetailPage />} />
    <Route path="/tree/:id" element={<TreePage />} />
    <Route path="/branch" element={<WeeklyBudsPage />} />
    <Route path="/branch/:studentId" element={<WeeklyBudsAdminPage />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/quest" element={<QuestPage />} />
    <Route path="*" element={<NotFoundPage />} />

    <Route path="/tutorial" element={<Tutorial />} />

    <Route path="/newsLetter/:groupId" element={<NewsLetterPage />} />
  </Routes>
)

export default RoutesComponent
