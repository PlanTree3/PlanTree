import { Google, Kakao } from '@/components'
import './LoginPage.scss'

const LoginPage = () => {
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
