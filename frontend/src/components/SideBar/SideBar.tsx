import { useState, useEffect } from 'react'
import './SideBar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import treeImg from '../../../public/sidebar/navbar_tree.png'
import forestImg from '../../../public/sidebar/navbar_forest.png'
// import post3 from '../../../public/sidebar/navbar_.png'
import questImg from '../../../public/sidebar/navbar_quest.png'
import nestImg from '../../../public/sidebar/navbar_nest.png'
import bell from '../../../public/bell.png'
import checkBell from '../../../public/checkBell.png'
import { logOutCheck } from '@/stores/features/userSlice'
import NotificationBox from '../notificationBox'
import Button from '../Button/Button'
import { notificationCheck } from '@/apis'

const SideBar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [checkData, setCheckData] = useState(false)
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
  const role = useSelector((state: any) => state.user.userData.role) ?? null
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  const handleLogout = async () => {
    dispatch(logOutCheck())
    navigate('/login')
  }
  // 새로운 알람있는지 확인
  const handleNotificationCheck = async () => {
    try {
      const response = await notificationCheck()
      console.log('알림함 체크 응답', response)
      setCheckData(response.data.data.notificationPresent)
    } catch (error) {
      console.error('알림함 체크 에러:', error)
    }
  }

  const roleBasedMain = (kind: string | null) => {
    switch (kind) {
      case 'STUDENT':
        return '/main'
      case 'TEACHER':
        return '/adminGroup'
      case 'PARENT':
        return '/adminNest'
      default:
        return '/main'
    }
  }

  //이 부분 추가 로직 필요 / 언제 체크할지?
  useEffect(() => {
    handleNotificationCheck()
  }, [])

  return (
    <div className="sidebar-container">
      <div className="sidebar-btn-container">
        <Link to={roleBasedMain(role)} className="sidebar-btn">
          <div className="img">
            <img src={treeImg} alt="Main" />
            메인
          </div>
        </Link>
        {(role === 'STUDENT' || null) && (
          <Link to="/forest" className="sidebar-btn">
            <div className="img">
              <img src={forestImg} alt="" />숲
            </div>
          </Link>
        )}
        {(role === 'STUDENT' || null) && (
          <Link to="/studentGroup" className="sidebar-btn">
            <div className="img">
              <img src={nestImg} alt="studentGroup" />
              둥지
            </div>
          </Link>
        )}
        <Link to="/quest" className="sidebar-btn">
          <div className="img">
            <img src={questImg} alt="Quest" />
            퀘스트
          </div>
        </Link>
        <Link to="/mypage" className="sidebar-btn">
          <div className="img">
            <img src={treeImg} alt="Mypage" />
            마이페이지
          </div>
        </Link>
      </div>
      <div className="sidebar-bottom">
        <button onClick={openModal} className="sidebar-bell">
          <img
            src={checkData ? checkBell : bell}
            alt="알람"
            className="sidebar-bell-img"
          />
        </button>
        <NotificationBox modalOpen={modalOpen} closeModal={closeModal} />

        {isLoggedIn && (
          <Button
            className="red small self-center"
            onClick={handleLogout}
            label="로그아웃"
          />
        )}
      </div>
    </div>
  )
}

export default SideBar
