import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FiPlusCircle } from 'react-icons/fi'
import { UserData } from '@/types'
import '@/styles/fontList.scss'
import '@/styles/profile.scss'
import './MyPageStyle.scss'

const MyPage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [userData, setUserData] = useState<UserData>([])
  const [inputProfileImg, setInputProfileImg] = useState<string>(
    userData.profileImage,
  )
  const MySwal = withReactContent(Swal)
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

  useEffect(() => {
    const persistedState = localStorage.getItem('persist:user')
    if (persistedState) {
      const parsing = JSON.parse(persistedState)
      const data = JSON.parse(parsing.userData)
      setUserData(data)
    }
  }, [])

  const chooseProfileImg = (url: string) => {
    setInputProfileImg(url)
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

      showCancelButton: true,
      confirmButtonText: '선택',
      cancelButtonText: '취소',

      reverseButtons: true,
    })
  }

  return (
    <div className="outer-box">
      <div
        className="inner-box"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="status">학생</div>
        <div className="profileImgBox">
          <img
            src={inputProfileImg}
            alt="유저이미지"
            className="mypage-image-container"
          />
          <button className="addImgBtn" onClick={() => moveProfileImg()}>
            <FiPlusCircle />
          </button>
        </div>
        <div className="nanum mypage-nickname">{userData.nickname}</div>
        <button className="mypage-button">가정 통신문 보기</button>
        <button className="mypage-button">튜토리얼 다시 보기</button>
      </div>
    </div>
  )
}

export default MyPage
