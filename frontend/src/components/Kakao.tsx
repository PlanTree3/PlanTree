import KakaoLogin from 'react-kakao-login'
import { useNavigate } from 'react-router-dom' // 라우팅 컴포넌트 밖에서 라우팅을 제어하기 위해 사용
// 주로 함수 내에서 페이지 이동을 제어해야할 경우 사용한다.
// useHistory -> useNavigate
import { useDispatch } from 'react-redux'
import { addIdToken, addOauthProvider } from '@/stores/features/signupSlice'
import { userLogin } from '@/apis/member'
import { loginCheck } from '@/stores/features/userSlice'
// import Swal from "sweetalert2";
// import { AxiosError } from "axios";
import kakaoBTN from '../../public/login_btn/kakao.png'

const Kakao = () => {
  const navigate = useNavigate()
  const kakaoKey = import.meta.env.VITE_PUBLIC_KAKAO_CLIENT_ID
  const dispatch = useDispatch()

  const handleLoginSuccess = async (response: any) => {
    const data = {
      oauthProvider: 'KAKAO',
      idToken: response.response.id_token,
    }
    const loginResult = await userLogin(data)

    if (loginResult) {
      dispatch(addOauthProvider('KAKAO'))
      dispatch(addIdToken(response.response.id_token))
      navigate('/signUp')
    } else {
      dispatch(loginCheck())
    }
  }

  const handleLoginFailure = (error: unknown) => {
    throw error
  }

  return (
    <KakaoLogin
      token={kakaoKey}
      onSuccess={handleLoginSuccess}
      onFail={handleLoginFailure}
      render={({ onClick }) => (
        <button onClick={onClick} className="flex justify-center w-2/3">
          <img src={kakaoBTN} alt="카카오 로그인" />
        </button>
      )}
    />
  )
}

export default Kakao
