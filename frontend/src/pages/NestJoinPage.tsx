import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { nestJoinRequest } from '@/apis'
// import axios from 'axios';

const NestJoinPage: React.FC<any> = () => {
  const { nestId } = useParams()

  const handleGroupJoin = async () => {
    try {
      const response = await nestJoinRequest(nestId)
      console.log('둥지가입 응답:', response)
    } catch (error) {
      console.error(error)
    }
  }
  // const navi = useNavigate()
  useEffect(() => {
    handleGroupJoin()
    // .then(() => {
    //   navi('/')
    // })
  }, [])

  return (
    <div>
      <div>둥지에 가입되었습니다.</div>
      <Link to="/main">
        <div>메인으로 돌아가기</div>
      </Link>
    </div>
  )
}

export default NestJoinPage
