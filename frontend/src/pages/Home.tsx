import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login')
  }
  const handleForest = () => {
    navigate('/forest')
  }
  return (
    <>
      <h1 className="text-5xl text-blue-300 font-bold">Hey!</h1>
      <button onClick={handleLogin}>로그인 페이지로</button>
      <Button
        className="primary"
        onClick={handleForest}
        label="예쁜 카드를 보러 가요"
      />
    </>
  )
}

export default Home
