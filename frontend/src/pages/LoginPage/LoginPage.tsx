import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginCheck } from '@/stores/features/userSlice'

import { Google, Kakao } from '@/components'
import './LoginPage.scss'

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)
  return (
    <div className="log-in-container">
      <div className="log-in-box">
        <img src="/public/plantree.png" alt="" />
        <Kakao />
        <Google />
        <button onClick={loginTest}>임시 로그인 버튼</button>
      </div>
    </div>
  )
}
export default LoginPage
