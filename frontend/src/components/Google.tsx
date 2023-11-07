import qs from 'qs'

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
    <div>
      {/* <GoogleOAuthProvider clientId={googleKey}>
       <RenewalGoogleLogin />
     </GoogleOAuthProvider> */}
      <a href={loginUrl}>dldldl</a>
    </div>
  )
}

export default Google
