// import { useNavigate } from 'react-router-dom'
// import Button from '@/components/Button/Button'
import { Google, Kakao } from '@/components'

const LogIn = () => {
  // const navigate = useNavigate()
  // const handleForest = () => {
  //   navigate('/forest')
  // }
  const baseURL = import.meta.env.VITE_PUBLIC_SERVER_BASE_URL
  console.log(baseURL)
  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-5xl text-blue-300 font-bold">지금부터</h1>
        <h1 className="text-5xl text-blue-300 font-bold">계획을 그려볼까요?</h1>
      </div>
      <div className="flex justify-center">
        <div className={`bg-[url('public/plantree.png')] w-60 h-60 bg-cover`} />
      </div>
      <div className="flex justify-center gap-8">
        <Kakao />
        <Google />
      </div>
      {/* <Button
        className="primary"
        onClick={handleForest}
        label="예쁜 카드를 보러 가요"
      /> */}
    </div>
  )
}

export default LogIn
