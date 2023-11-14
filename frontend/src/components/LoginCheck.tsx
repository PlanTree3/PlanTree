import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/stores/store.ts'

const LoginCheck = (WrappedComponent: any) => {
  return function WithLoginCheck(props: any) {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/')
      }
    }, [isLoggedIn, navigate])

    return isLoggedIn ? <WrappedComponent {...props} /> : null
  }
}

export default LoginCheck
