import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginCheck } from '@/stores/features/userSlice'

import { Google, Kakao } from '@/components'
import './LoginPage.scss'

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginTest = () => {
    // test입니다.
    const testURL =
      // 'https://k9a302a.p.ssafy.io/api/member-service/dev/auth/login?oauthId=yjStudent'
      'https://k9a302a.p.ssafy.io/api/member-service/dev/auth/login?oauthId=jyTeacher'
    axios
      .post(testURL, null, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        dispatch(loginCheck())
        navigate('/mypage')
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
