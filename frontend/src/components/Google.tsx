import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google'

const Google = () => {
  const googleKey = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID
  // const handleLoginSuccess = async (response: unknown) => {
  //   console.log('로그인 성공', response)
  // }
  // const handleLoginFailure = () => {
  //   console.log('로그인 실패')
  // }

  const login = useGoogleLogin({
    onSuccess: token => console.log(token),
  })

  return (
    <GoogleOAuthProvider clientId={googleKey}>
      {/*<GoogleLogin*/}
      {/*  onSuccess={handleLoginSuccess}*/}
      {/*  onError={handleLoginFailure}*/}
      {/*/>*/}

    </GoogleOAuthProvider>
  )
}

export default Google
