import { groupJoinRequest } from '@/apis'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios';

const GroupJoinPage: React.FC<any> = ({ groupId }) => {
  const handleGroupJoin = async () => {
    console.log('1')
    try {
      console.log('2')
      const response = await groupJoinRequest(groupId)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const navi = useNavigate()
  useEffect(() => {
    handleGroupJoin().then(() => {
      navi('/')
    })
  }, [])

  return (
    <div>
      <div>그룹 가입요청이 보내졌습니다.</div>
    </div>
  )
}

export default GroupJoinPage
