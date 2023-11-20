import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin } from '@/apis/member'
import { addIdToken, addOauthProvider } from '@/stores/features/signupSlice'
import { loginCheck } from '@/stores/features/userSlice'

const OidcGoogle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const { hash } = window.location
      const idTokenMatch = hash.match(/&id_token=([^&]*)/)

      if (idTokenMatch) {
        const idToken = idTokenMatch[1]

        const data = {
          oauthProvider: 'GOOGLE',
          idToken,
        }
        try {
          const loginResult = await userLogin(data)
          if (loginResult) {
            dispatch(addOauthProvider('GOOGLE'))
            dispatch(addIdToken(idToken))
            navigate('/signUp')
          } else {
            dispatch(loginCheck())
          }
        } catch (error) {
          console.error('Error during login:', error)
        }
      }
    }

    fetchData()
  }, [])

  return <div />
}

export default OidcGoogle
