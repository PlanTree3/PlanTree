// import { useState } from 'react'
import { ReactDOM } from 'react-dom'
import Modal from 'react-modal'

const UserProfileImg = () => {
  const [inputProfileImg, setInputProfileImg] = useState<string>('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => [setModalIsOpen(false)]
  return (
    <>
      <div>
        <button onClick={openModal}>모달 열기</button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>모달 제목</h2>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </div>
    </>
  )
}

export default UserProfileImg
