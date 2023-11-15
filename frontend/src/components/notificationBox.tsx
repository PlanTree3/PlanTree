import ReactModal from 'react-modal'
import { useEffect } from 'react'
import { notificationBox } from '@/apis/notification'

const NotificationBox = ({ modalIsOpen, closeModal }: any) => {
  // 알림함 조회
  const handleNotification = async () => {
    try {
      const response = await notificationBox()
      console.log('알림함 조회', response)
    } catch (error) {
      console.error('알림함 에러:', error)
    }
  }
  useEffect(() => {
    handleNotification()
  }, [])

  return (
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
  )
}

export default NotificationBox
