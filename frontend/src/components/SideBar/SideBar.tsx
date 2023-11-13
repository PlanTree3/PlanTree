import { useState } from 'react'
// import axios from 'axios';
import ReactModal from 'react-modal'
import './SideBar.scss'
import { Link } from 'react-router-dom'
import post2 from '../../../public/sidebar/02_orange.png'
import post3 from '../../../public/sidebar/03_yellow.png'
import post4 from '../../../public/sidebar/04_gress.png'
import post5 from '../../../public/sidebar/05_sky.png'
import post1 from '../../../public/sidebar/01_red.png'
import bell from '../../../public/bell.png'
import { useSelector } from 'react-redux'

const SideBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  const handleLogout = () => {
    console.log('로그아웃 버튼 실행')
  }
  return (
    <>
      <div className="sidebar-btn">
        <Link to="/" className="sidebar-btn-deco">
          <button>
            <img src={post1} alt="Home" className="btn-deco" />
          </button>
        </Link>
        <Link to="/main" className="sidebar-btn-deco">
          <button>
            <img src={post2} alt="Main" className="btn-deco" />
          </button>
        </Link>
        <Link to="/branch" className="sidebar-btn-deco">
          <button>
            <img src={post3} alt="Branch" className="btn-deco" />
          </button>
        </Link>
        <Link to="/mypage" className="sidebar-btn-deco">
          <button>
            <img src={post4} alt="Mypage" className="btn-deco" />
          </button>
        </Link>
        <Link to="/quest" className="sidebar-btn-deco">
          <button>
            <img src={post5} alt="Quest" className="btn-deco" />
          </button>
        </Link>
      </div>
      <button onClick={openModal} className="sidebar-bell">
        <img src={bell} alt="알람" className="sidebar-bell-img" />
      </button>
      {isLoggedIn && <button onClick={handleLogout}>로그아웃</button>}

      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: 10,
            top: 0,
            left: 0,
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            border: '1px #000',
            borderRadius: '10px',
            overflow: 'auto',
            background: '#F5F5DC',
            boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <div className="font-semibold text-xl">알림 확인하기</div>
      </ReactModal>
    </>
  )
}

export default SideBar
