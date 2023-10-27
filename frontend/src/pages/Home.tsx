import { useNavigate } from 'react-router-dom'
import logo from '../../public/plantree.png'

const Home = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <>
      <img className="logo" src={logo} alt="logo" />
      <h1 className="text-5xl text-blue-300 font-bold">Hey!</h1>
      <button onClick={handleLogin}>로그인 페이지로</button>
    </>
  )
}

export default Home
