import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import googleBtn from '../asset/login_btn/web_light_sq_na@4x.png'
import { userLogin } from '@/apis/member'
import { addOauthProvider } from '@/stores/features/signupSlice'

const RenewalGoogleLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const googleSocialLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse)
      const data = {
        oauthProvider: 'GOOGLE',
        idToken: codeResponse,
      }

      const loginResult = await userLogin(data)

      if (loginResult) {
        dispatch(addOauthProvider('GOOGLE'))
        navigate('/signUp')
      } else {
        navigate('/main')
      }
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
