import { useEffect, useState } from 'react'
import './SignUp.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { LuImagePlus } from 'react-icons/lu'
import { userSignup } from '@/apis/member'
import { addProfileImg } from '@/stores/features/signupSlice'

const UserProfileImg = () => {
  const [inputProfileImg, setInputProfileImg] = useState<string>('')
  const [isProfileImg, setIsProfileImg] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const imgList: string[] = [
    'bear',
    'cat',
    'frog',
    'monkey',
    'pig',
    'rabit',
    'rat',
    'sheep',
    'tiger',
  ]

  const oauthProvider = useSelector((state: any) => state.signup.oauthProvider)
  const userName = useSelector((state: any) => state.signup.name)
  const userBirth = useSelector((state: any) => state.signup.birthday)
  const userRole = useSelector((state: any) => state.signup.role)
  const userProfileImg = useSelector((state: any) => state.signup.profileImg)

  // 객체에 담아서 백에 보내주자!
  const data = {
    oauthProvider,
    name: userName,
    birthDate: userBirth,
    role: userRole,
    profileImageUrl: userProfileImg,
  }

  const saveUser = () => {
    console.log(data)
    userSignup(data)
  }

  const chooseProfileImg = (url: string) => {
    setInputProfileImg(url)
    setIsProfileImg(true)
    dispatch(addProfileImg(url))
  }

  const openModal = () => {
    setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(true)
  }

  const moveProfileImg = () => {
    const content = (
      <div>
        {imgList.map((img: string) => (
          <button
            onClick={() => chooseProfileImg(`src/asset/profile/${img}.jpg`)}
          >
            <img
              className="selectImg"
              src={`src/asset/profile/${img}.jpg`}
              alt={img}
            />
          </button>
        ))}
      </div>
    )

    MySwal.fire({
      title: '당신의 원픽은?',
      html: content,
      width: 800,
      heightAuto: true,
      didOpen: () => openModal(),
      willClose: () => closeModal(),

      showCancelButton: true,
      confirmButtonText: '선택',
      cancelButtonText: '취소',

      reverseButtons: true,
    })
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     setIsProfileImg(true)
    //   }
    // })
  }

  return (
    <div className="w-8/12 h-3/5 relative">
      <div className="flex bg-no-repeat w-full h-full bg-contain bg-[url('./asset/student_card/rm245-bb-17-g.jpg')]">
        <button className="addImgBtn" onClick={() => moveProfileImg()}>
          <LuImagePlus />
        </button>
        <div className="profileImg">
          {isProfileImg || isModalOpen ? (
            <img
              className="showProfileImg"
              src={inputProfileImg}
              alt={inputProfileImg}
            />
          ) : (
            <div className="profilePlaceholder">프로필 사진을 선택하세요!</div>
          )}
        </div>
        <span>
          <div className="rounded-full border-slate-950">학생</div>
          <div>이름</div>
          <div>나이</div>
          <div>생일</div>
        </span>
      </div>
      <button className="absolute right-0" onClick={saveUser}>
        지금부터 숲을 가꿔보자!
      </button>
    </div>
  )
}

export default UserProfileImg
