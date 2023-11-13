import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginCheck = () => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('로그인 체크', isLoggedIn)
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])
  return null
}

export default LoginCheck
