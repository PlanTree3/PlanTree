import { Route, Routes } from 'react-router-dom'
import { Home, LoginPage, OauthRedirectPage } from './pages'
import BranchPage from "@/pages/BranchPage.tsx";

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/oauth" element={<OauthRedirectPage />} />
    <Route path="/test" element={<BranchPage />} />
  </Routes>
)

export default RoutesComponent
