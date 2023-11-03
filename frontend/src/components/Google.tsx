import { GoogleOAuthProvider } from '@react-oauth/google'
import RenewalGoogleLogin from './RenewalGoogleLogin.tsx'

const Google = () => {
  const googleKey = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID

  return (
    <GoogleOAuthProvider clientId={googleKey}>
      <RenewalGoogleLogin />
    </GoogleOAuthProvider>
  )
}

export default Google
