import ReactModal from 'react-modal'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  notificationBox,
  notificationDelete,
  notificationReading,
} from '@/apis/notification'
import { Button } from '.'
import { userInfo } from '@/apis'

const NotificationBox = ({ modalOpen, closeModal }: any) => {
  const [notificationData, setNotificationData] = useState<any>(null)
  const [userRole, setUserRole] = useState<any>(null)
  // 유저 정보
  const handleUserInfo = async () => {
    try {
      const response = await userInfo()
      setUserRole(response.data.role)
    } catch (error) {
      console.error(error)
    }
  }

  // 알림함 조회
  const handleNotification = async () => {
    try {
      const response = await notificationBox()
      setNotificationData(response.data.data.notifications)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    handleNotification()
  }, [modalOpen])

  // 알림함 삭제
  const handleNotificationDelete = async () => {
    try {
      const response = await notificationDelete()
      console.log('알림함 전체 응답', response)
    } catch (error) {
      console.error(error)
    }
    closeModal()
  }

  // 알림함 알림 하나 조회
  const handleNotificationReading = async (notificationId: any) => {
    try {
      const response = await notificationReading(notificationId)
      console.log('알림 하나 조회 응답', response)
    } catch (error) {
      console.error(error)
    }
  }
  // 알림들 돌면서 전체 읽음 처리
  const handleNotificationAll = async () => {
    if (!Array.isArray(notificationData)) return

    notificationData.forEach(async (notification: any) => {
      try {
        await handleNotificationReading(notification.notificationId)
      } catch (error) {
        console.error(error)
      }
    })
  }

  useEffect(() => {
    handleUserInfo()
    // handleNotification()
  }, [])

  // 타입에 따른 문구
  const getNotificationTypeText = (
    type: string,
    branchName?: string,
    budName?: string,
  ) => {
    switch (type) {
      case 'STU_GEN_BUD':
        return ` 학생이 ${budName} 봉오리를 생성했어요`
      case 'STU_COM_BUD':
        return ` 학생이 ${budName} 봉오리를 완료했어요`
      case 'STU_GEN_BRA':
        return ` 학생이 ${branchName} 가지를 만들었어요`
      case 'PAR_GEN_BRA':
        return `부모가 ${branchName} 가지를 만들었어요`
      case 'TEA_GEN_BRA':
        return ` 선생이 ${branchName} 가지를 만들었어요`
      case 'STU_WRI_BUD':
        return ` 학생이 ${budName} 버드에 코멘트를 남겼어요`
      case 'PAR_WRI_BUD':
        return ` 부모가 ${budName} 버드에 코멘트를 남겼어요`
      case 'TEA_WRI_BUD':
        return ` 선생이 ${budName} 버드에 코멘트를 남겼어요`
      default:
        return '알 수 없는 타입'
    }
  }

  // 알림함에 보여주는 형식
  const renderNotifications = () => {
    if (!notificationData || notificationData.length === 0) {
      return <p>조회할 수 있는 알림이 없습니다</p>
    }

    return (
      <div>
        {notificationData.map((notification: any, index: number) => (
          <div key={index}>
            {userRole === 'TEACHER' || userRole === 'PARENT' ? (
              <Link to={`/branch/${notification.treeId}`}>
                <p>
                  {index + 1} {notification.memberName}
                  {getNotificationTypeText(
                    notification.type,
                    notification.branchName,
                    notification.budName,
                  )}{' '}
                </p>
              </Link>
            ) : (
              <Link to="/branch">
                <p>
                  {index + 1} {notification.memberName}
                  {getNotificationTypeText(
                    notification.type,
                    notification.branchName,
                    notification.budName,
                  )}{' '}
                </p>
              </Link>
            )}
          </div>
        ))}
        <Button
          label="전체 읽음"
          onClick={handleNotificationAll}
          className="normal primary"
        />
        <Button
          label="전체 삭제"
          onClick={handleNotificationDelete}
          className="normal red ml-[1vh]"
        />
      </div>
    )
  }

  return (
    <ReactModal
      isOpen={modalOpen}
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
      {renderNotifications()}
    </ReactModal>
  )
}

export default NotificationBox
