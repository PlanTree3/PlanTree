import { useNavigate } from 'react-router-dom'
// import Button from '@/components/Button/Button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginCheck } from '@/stores/features/userSlice'
import { Google, Kakao } from '@/components'

const LogIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginTest = () => {
    // test입니다.
    const testURL =
      'https://k9a302a.p.ssafy.io/api/member-service/dev/auth/login?oauthId=yjStudent'
    // 'https://k9a302a.p.ssafy.io/api/member-service/dev/auth/login?oauthId=yjTeacher'
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

  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)
  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-5xl text-blue-300 font-bold">지금부터</h1>
        <h1 className="text-5xl text-blue-300 font-bold">계획을 그려볼까요?</h1>
      </div>
      <div className="flex justify-center">
        <div className={`bg-[url('/plantree.png')] w-60 h-60 bg-cover`} />
      </div>
      <div className="flex justify-center gap-8">
        <Kakao />
        <Google />
        <button onClick={loginTest}>임시 로그인 버튼</button>
      </div>
      {/* <Button
        className="primary"
        onClick={handleForest}
        label="예쁜 카드를 보러 가요"
      /> */}
    </div>
  )
}

export default LogIn
