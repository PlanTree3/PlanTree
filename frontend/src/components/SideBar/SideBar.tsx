import { useState } from 'react'
import './SideBar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import post2 from '../../../public/sidebar/02_orange.png'
import post3 from '../../../public/sidebar/03_yellow.png'
import post4 from '../../../public/sidebar/04_gress.png'
import post5 from '../../../public/sidebar/05_sky.png'
import post1 from '../../../public/sidebar/01_red.png'
import bell from '../../../public/bell.png'
import { logOutCheck } from '@/stores/features/userSlice'
import NotificationBox from '../notificationBox'

const SideBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
  const role = useSelector((state: any) => state.user.userData.role) ?? null
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  const handleLogout = async () => {
    dispatch(logOutCheck())
    navigate('/')
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

  return (
    <>
      <div className="sidebar-btn">
        <Link to={roleBasedMain(role)} className="sidebar-btn-deco">
          <button>
            <img src={post1} alt="Main" className="btn-deco" />
          </button>
        </Link>
        {(role === 'STUDENT' || null) && (
          <Link to="/forest" className="sidebar-btn-deco">
            <button>
              <img src={post2} alt="Forest" className="btn-deco" />
            </button>
          </Link>
        )}
        {(role === 'STUDENT' || null) && (
          <Link to="/studentGroup" className="sidebar-btn-deco">
            <button>
              <img src={post3} alt="studentGroup" className="btn-deco" />
            </button>
          </Link>
        )}
        <Link to="/quest" className="sidebar-btn-deco">
          <button>
            <img src={post4} alt="Quest" className="btn-deco" />
          </button>
        </Link>
        <Link to="/mypage" className="sidebar-btn-deco">
          <button>
            <img src={post5} alt="Mypage" className="btn-deco" />
          </button>
        </Link>
      </div>
      <button onClick={openModal} className="sidebar-bell">
        <img src={bell} alt="알람" className="sidebar-bell-img" />
      </button>
      {isLoggedIn && <button onClick={handleLogout}>로그아웃</button>}
      <NotificationBox modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  )
}

export default SideBar
