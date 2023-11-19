import { Google, Kakao } from '@/components'
import './LoginPage.scss'

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)

  return (
    <div className="log-in-container">
      <div className="log-in-box">
        <img src="/public/plantree.png" alt="" />
        <Kakao />
        <Google />
      </div>
    </div>
  )
}
export default LoginPage
