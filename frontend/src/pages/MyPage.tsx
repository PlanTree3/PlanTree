import { useEffect, useState } from 'react'
import { UserData } from '@/types'
import '@/styles/fontList.scss'
import '@/styles/profile.scss'

const MyPage = () => {
  const [userData, setUserData] = useState<UserData>([])
  useEffect(() => {
    const persistedState = localStorage.getItem('persist:user')
    if (persistedState) {
      const parsing = JSON.parse(persistedState)
      const data = JSON.parse(parsing.userData)
      setUserData(data)
    }
  }, [])
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
        <img
          src={userData.profileImage}
          alt="유저이미지"
          className="mypage-image-container"
        />
        <div className="nanum mypage-nickname">{userData.nickname}</div>
        <button className="mypage-button">가정 통신문 보기</button>
        <button className="mypage-button">튜토리얼 다시 보기</button>
      </div>
    </div>
  )
}

export default MyPage
