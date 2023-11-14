import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { groupJoinRequest } from '@/apis'
// import axios from 'axios';

const GroupJoinPage: React.FC<any> = () => {
  const { groupId } = useParams()

  const handleGroupJoin = async () => {
    try {
      const response = await groupJoinRequest(groupId)
      console.log('그룹가입신청 응답:', response)
    } catch (error) {
      console.error('그룹가입신청 Error:', error)
    }
  }
  // const navi = useNavigate()
  useEffect(() => {
    handleGroupJoin()
    // .then(() => {
    //   navi('/studentGroup')
    // })
  }, [])

  return (
    <div>
      <div>그룹 가입이 신청되었습니다.</div>
      <Link to="/main">
        <div>메인으로 돌아가기</div>
      </Link>
    </div>
  )
}

export default GroupJoinPage
