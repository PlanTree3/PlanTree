import { useGoogleLogin } from '@react-oauth/google'
import googleBtn from '../asset/login_btn/web_light_sq_na@4x.png'
// import axios from 'axios'

const RenewalGoogleLogin = () => {
  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse)
      // axios.post()
    },
    flow: 'auth-code',
  })

  return (
    <button onClick={() => googleSocialLogin()}>
      <img src={googleBtn} alt="googleLogin" />
    </button>
  )
}

export default RenewalGoogleLogin
