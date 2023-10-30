import { GoogleOAuthProvider} from '@react-oauth/google'
// import googleBtn from '../asset/login_btn/kakao_login_small.png'
import { Route } from 'react-router-dom'
import RenewalGoogleLogin from './RenewalGoogleLogin.tsx'

const Google = () => {
  const googleKey = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID
  // const handleLoginSuccess = async (response: unknown) => {
  //   console.log('로그인 성공', response)
  // }
  // const handleLoginFailure = () => {
  //   console.log('로그인 실패')
  // }

  // const login = useGoogleLogin({
  //   onSuccess: codeResponse => console.log(codeResponse),
  //   flow: 'auth-code',
  // })

  return (
    <GoogleOAuthProvider clientId={googleKey}>
      {/*<GoogleLogin*/}
      {/*  onSuccess={handleLoginSuccess}*/}
      {/*  onError={handleLoginFailure}*/}
      {/*/>*/}
      {/*<button onClick={login}>*/}
      {/*  <img src = {googleBtn} alt="google login"/>*/}
      {/*</button>*/}
      <Route exact path='/login' component={RenewalGoogleLogin} />
    </GoogleOAuthProvider>
  )
}

export default Google
