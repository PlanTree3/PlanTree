import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button/Button'
import { Google, Kakao } from '@/components'

const LogIn = () => {
  const navigate = useNavigate()
  const handleForest = () => {
    navigate('/forest')
  }
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)
  return (
    <>
      <h1 className="text-5xl text-blue-300 font-bold">Hey!</h1>
      <Kakao />
      <Google />
      <Button
        className="primary"
        onClick={handleForest}
        label="예쁜 카드를 보러 가요"
      />
    </>
  )
}

export default LogIn
