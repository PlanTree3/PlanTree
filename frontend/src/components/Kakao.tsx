import KakaoLogin from 'react-kakao-login'
import kakaoBtn from '../asset/login_btn/kakaotalk_sharing_btn_small.png'
import '../styles/LogIn.scss'
import { userLogin } from '@/apis/member'
// import { userLogin } from '@/apis/member'

const Kakao = () => {
  const kakaoKey = import.meta.env.VITE_PUBLIC_KAKAO_CLIENT_ID

  const handleLoginSuccess = async (response: unknown) => {
    console.log('로그인 성공', response)
    const data = {
      oauthProvider: 'KAKAO',
      idToken: response.response.id_token,
    }

    userLogin(data)
  }

  const handleLoginFailure = (error: unknown) => {
    console.log('로그인 실패', error)
  }

  return (
    <KakaoLogin
      token={kakaoKey}
      onSuccess={handleLoginSuccess}
      onFail={handleLoginFailure}
      render={({ onClick }) => (
        <button className="social_login_button" onClick={onClick}>
          <img
            className="social_login_img"
            src={kakaoBtn}
            alt="카카오 로그인"
          />
          <span>카카오로 로그인</span>
        </button>
      )}
    />
  )
}

export default Kakao
