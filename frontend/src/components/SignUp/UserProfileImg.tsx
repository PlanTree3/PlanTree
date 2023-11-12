import { useEffect, useState } from 'react'
import './SignUp.scss'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { LuImagePlus } from 'react-icons/lu'
import { userSignup } from '@/apis/member'
import { addProfileImg } from '@/stores/features/signupSlice'
import { loginCheck } from '@/stores/features/userSlice'

const UserProfileImg = () => {
  const oauthProvider =
    useSelector((state: any) => state.signup.oauthProvider) ?? 'kakao'
  const idToken = useSelector((state: any) => state.signup.idToken) ?? 123123
  const userName = useSelector((state: any) => state.signup.name) ?? '요정예지'
  const userBirth =
    useSelector((state: any) => state.signup.birthday) ?? new Date()

  const userRole = useSelector((state: any) => state.signup.role) ?? 'STUDENT'

  const navigate = useNavigate()

  const [inputProfileImg, setInputProfileImg] = useState<string>(
    'public/profile/bear.jpg',
  )
  const [isProfileImg, setIsProfileImg] = useState<boolean>(false)
  const [inputUserRole, setInputUserRole] = useState<string>('')
  const [bgColor, setBgColor] = useState<string>('')
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const imgList: string[] = [
    'bear',
    'cat',
    'frog',
    'monkey',
    'pig',
    'rabbit',
    'rat',
    'sheep',
    'tiger',
  ]

  // userBirth로부터 나이 추출
  const currentDate = new Date()
  const userAge = currentDate.getFullYear() - userBirth.getFullYear()

  // userBirth로부터 month, day 추출
  const userBirthMonth = userBirth.getMonth() + 1
  const userBirthDay = userBirth.getDate()

  // userRole 한국어 패치
  const showUserRole = () => {
    switch (userRole) {
      case 'STUDENT':
        setInputUserRole('학생')
        setBgColor('bg-teal-200')
        break
      case 'TEACHER':
        setInputUserRole('선생님')
        setBgColor('bg-amber-400')
        break
      case 'PARENT':
        setInputUserRole('학부모')
        setBgColor('bg-lime-400')
        break
      default:
        break
    }
  }

  // 객체에 담아서 백에 보내주자!
  const signUpData = {
    idToken,
    oauthProvider,
    name: userName,
    birthDate: userBirth,
    role: userRole,
    profileImageUrl: inputProfileImg,
  }

  const saveUser = () => {
    userSignup(signUpData)
    dispatch(loginCheck())
    navigate('/main')
  }

  const chooseProfileImg = (url: string) => {
    setInputProfileImg(url)
    setIsProfileImg(true)
    dispatch(addProfileImg(url))
  }

  const moveProfileImg = () => {
    const content = (
      <div className="mb-3.5">
        {imgList.map((img: string, index: number) => (
          <button
            key={index}
            className="selectImg p-0 mx-1"
            onClick={() => {
              chooseProfileImg(`public/profile/${img}.jpg`)
              MySwal.close()
            }}
          >
            <img
              className="selectImg m-0"
              src={`public/profile/${img}.jpg`}
              alt={img}
            />
          </button>
        ))}
      </div>
    )

    MySwal.fire({
      title: '프로필 사진을 골라 주세요',
      html: content,
      width: '27%',
      heightAuto: false,
      position: 'center',
      showConfirmButton: false,
      padding: 0,
    })
  }

  useEffect(() => {
    showUserRole()
  }, [userRole])

  return (
    <div className="w-8/12 h-3/5 relative">
      <div className="flex bg-no-repeat w-full h-full bg-contain bg-[url('./asset/student_card/rm245-bb-17-g.jpg')]">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="addImgBtn" onClick={() => moveProfileImg()}>
          <LuImagePlus />
        </button>
        <div className="profileImg">
          {isProfileImg ? (
            <img
              className="showProfileImg"
              src={inputProfileImg}
              alt={inputProfileImg}
            />
          ) : (
            <div className="profilePlaceholder">프로필 사진을 선택하세요!</div>
          )}
        </div>
        <span className="w-3/5 flex">
          <div
            className={`mx-1 w-max h-min border-2 rounded-full border-zinc-950 ${bgColor}`}
          >
            <div className="mx-1 text-xs">{inputUserRole}</div>
          </div>
          <div className="w-2/6">
            <div className="title">이름</div>
            <div className="title">나이</div>
            <div className="title">생일</div>
          </div>
          <div className="w-3/6">
            <div className="content">
              <div>{userName}</div>
            </div>
            <div className="content">
              <div>{userAge}세</div>
            </div>
            <div className="content">
              <div>
                {userBirthMonth}월 {userBirthDay}일
              </div>
            </div>
          </div>
        </span>
      </div>
      <button className="absolute right-0" onClick={saveUser}>
        지금부터 숲을 가꿔보자!
      </button>
    </div>
  )
}

export default UserProfileImg
