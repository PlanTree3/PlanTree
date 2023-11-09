import qs from 'qs'
import googleBtn from '../../public/asset/login_btn/web_light_sq_na@4x.png'
import '../styles/LogIn.scss'

const Google = () => {
  const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth'
  const GoggleQuery = qs.stringify({
    client_id: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/oidc/google',
    response_type: 'token id_token',
    scope: 'openid profile email',
    nonce:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
  })

  const loginUrl = `${AUTHORIZE_URI}?${GoggleQuery}`
  console.log(import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID)

  return (
    <div className="social_login_Gbutton">
      <a href={loginUrl}>
        <img src={googleBtn} alt="googleLogin" />
      </a>
    </div>
  )
}

export default Google
