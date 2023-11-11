import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { nestJoinRequest } from '@/apis'
// import axios from 'axios';

const NestJoinPage: React.FC<any> = ({ groupId }) => {
  const handleGroupJoin = async () => {
    console.log('1')
    try {
      console.log('2')
      const response = await nestJoinRequest(groupId)
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
      <div>둥지에 가입되었습니다.</div>
    </div>
  )
}

export default NestJoinPage
