import qs from 'qs'
import googleBtn from '../../public/login_btn/google.png'

const Google = () => {
  // const frontBase = import.meta.env.VITE_PUBLIC_CLIENT_BASE_URL
  const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth'
  const GoggleQuery = qs.stringify({
    client_id: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
    // 슬슬 프론트 uri도 서버로 변경해야 함
    // redirect_uri: `${frontBase}oidc/google`,
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
    <a href={loginUrl} className="w-2/3 flex justify-center">
      <img src={googleBtn} alt="googleLogin" />
    </a>
  )
}

export default Google
