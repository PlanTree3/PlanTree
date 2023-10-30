import Kakao from '../components/Kakao.tsx'
import Google from '../components/Google.tsx'

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)
  return (
    <>
      <button>
          <Kakao />
      </button>

      <button>
        <Google />
        {/*<img src={googleBtDark} alt="구글 로그인" />*/}
      </button>
    </>
  )
}
export default LoginPage
