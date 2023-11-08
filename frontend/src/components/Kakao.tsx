import KakaoLogin from 'react-kakao-login'
import { useNavigate } from 'react-router-dom' // 라우팅 컴포넌트 밖에서 라우팅을 제어하기 위해 사용
// 주로 함수 내에서 페이지 이동을 제어해야할 경우 사용한다.
// useHistory -> useNavigate
import { useDispatch } from 'react-redux'
import { addIdToken, addOauthProvider } from '@/stores/features/signupSlice'
import '../styles/LogIn.scss'
import { userLogin } from '@/apis/member'
import { loginCheck } from '@/stores/features/userSlice'
// import Swal from "sweetalert2";
// import { AxiosError } from "axios";

const Kakao = () => {
  const navigate = useNavigate()
  const kakaoKey = import.meta.env.VITE_PUBLIC_KAKAO_CLIENT_ID
  const dispatch = useDispatch()

  const handleLoginSuccess = async (response: any) => {
    console.log('로그인 성공', response)
    const data = {
      oauthProvider: 'KAKAO',
      idToken: response.response.id_token,
    }

    //idToken 확인
    console.log(data.idToken)

    // userLogin에 data를 넣어
    // boolean이 return
    // true면 signIn으로 라우팅해
    // 일단 이 함수는 true, false를 return하게 하자!
    const loginResult = await userLogin(data)
    console.log('로그인 결과', loginResult)

    if (loginResult) {
      dispatch(addOauthProvider('KAKAO'))
      dispatch(addIdToken(response.response.id_token))
      navigate('/signUp')
    } else {
      dispatch(loginCheck())
      navigate('/main')
    }
    // catch (error: any) {
    //   Swal.fire({
    //     title: `${error.message} 로 서버와 통신에 실패했습니다.`,
    //     width: 600,
    //     customClass: {
    //       confirmButton: 'btn btn-primary',
    //     },
    //     buttonsStyling: false,
    //     confirmButtonText: 'Home 으로 이동',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       navigate('/')
    //     }
    //   })
    // }
  }

  const handleLoginFailure = (error: unknown) => {
    console.log('소셜 로그인 실패', error)
  }

  return (
    <KakaoLogin
      token={kakaoKey}
      onSuccess={handleLoginSuccess}
      onFail={handleLoginFailure}
      render={({ onClick }) => (
        <button className="social_login_button" onClick={onClick}>
          <img
            className="social_login_img"
            src="src/asset/login_btn/kakao_login_medium_narrow.png"
            alt="카카오 로그인"
          />
        </button>
      )}
    />
  )
}

export default Kakao
