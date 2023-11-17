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

  // userBirth가 string으로 오면 Date로 변경
  // persist에는 직렬 가능한 정보를 넣어야 하기에 object 저장 X가 원칙
  const checkDateType = (day: Date | string) => {
    if (day instanceof Date) {
      return day
    }
    const fixDay = new Date(day)
    return fixDay
  }

  // userBirth로부터 나이 추출
  const currentDate = new Date()
  const userBithDate = checkDateType(userBirth)
  const userAge = currentDate.getFullYear() - userBithDate.getFullYear()

  // userBirth로부터 month, day 추출
  const userBirthMonth = userBithDate.getMonth() + 1
  const userBirthDay = userBithDate.getDate()

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

  const saveUser = async () => {
    const response: any = await userSignup(signUpData)
    console.log(response)
    if (response) {
      dispatch(loginCheck())
    }
    navigate('/main')
  }

  const chooseProfileImg = (url: string) => {
    setInputProfileImg(url)
    setIsProfileImg(true)
    dispatch(addProfileImg(url))
  }

  const moveProfileImg = () => {
    const content = (
      <div className="selectImgModal">
        {imgList.map((img: string, index: number) => (
          <button
            key={index}
            className="selectImg"
            onClick={() => {
              chooseProfileImg(`/profile/${img}.jpg`)
              MySwal.close()
            }}
          >
            <img className="selectImg" src={`/profile/${img}.jpg`} alt={img} />
          </button>
        ))}
      </div>
    )

    MySwal.fire({
      title: '프로필 사진을 고르세요',
      html: content,
      width: '45%',
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
    <div className="studentCard">
      <div className="sign-up-profile-image-container">
        <div className="profileImg">
          {isProfileImg ? (
            <img
              className="showProfileImg"
              src={inputProfileImg}
              alt={inputProfileImg}
            />
          ) : (
            <div className="profilePlaceholder">
              <div>프로필 사진을 선택하세요!</div>
            </div>
          )}
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button onClick={() => moveProfileImg()}>
          <LuImagePlus />
        </button>
      </div>
      <div className="sign-up-info">
        <div className="sign-up-info-container">
          <div>이름</div>
          <div className="flex justify-center items-center gap-1">
            {userName}
            <div className={`userRole ${bgColor}`}>{inputUserRole}</div>
          </div>
          <div>나이</div>
          <div>{userAge}세</div>
          <div>생일</div>
          <div>
            {userBirthMonth}월 {userBirthDay}일
          </div>
        </div>
      </div>
      <button className="lime normal" onClick={saveUser}>
        지금부터 숲을 가꿔보자!
      </button>
    </div>
  )
}

export default UserProfileImg
