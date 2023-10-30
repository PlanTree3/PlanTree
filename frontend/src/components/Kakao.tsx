import KakaoLogin from 'react-kakao-login'
import kakaoBtn from '../asset/login_btn/kakao_login_small.png'

const Kakao = () => {
  const kakaoKey = import.meta.env.VITE_PUBLIC_KAKAO_CLIENT_ID

  const handleLoginSuccess = async (response: unknown) => {
    console.log('로그인 성공', response)
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
        <button
          onClick={onClick}
          style={{
            border: 'none',
            background: 'none',
            padding: '0',
            cursor: 'pointer',
          }}
        >
          <img
            src={kakaoBtn}
            alt="카카오 로그인"
            style={{ width: '100%', height: '100%' }}
          />
        </button>
      )}
    />
  )
}

export default Kakao