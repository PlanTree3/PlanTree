import {useGoogleLogin} from '@react-oauth/google'
import googleBtn from '../asset/login_btn/kakao_login_small.png'

const RenewalGoogleLogin = () => {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  })

  return (
    <button onClick={() => googleSocialLogin()}>
      <img src={googleBtn} alt='google_login' />
    </button>
  )
}

export default RenewalGoogleLogin