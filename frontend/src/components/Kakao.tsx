import KakaoLogin from 'react-kakao-login'

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
    />
  )
}

export default Kakao
