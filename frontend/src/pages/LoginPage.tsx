import Kakao from '../components/Kakao.tsx'
import kakaoBtn from '../asset/login_btn/kakao_btn_login.png'
// import googleBtDark from '../asset/login_btn/google_btn_dark.png'
import Google from '../components/Google.tsx'

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)
  return (
    <>
      <button>
        <Kakao />
        <img src={kakaoBtn} alt="카카오 로그인" />
      </button>

      <button>
        <Google />
        {/*<img src={googleBtDark} alt="구글 로그인" />*/}
      </button>
    </>
  )
}
export default LoginPage
