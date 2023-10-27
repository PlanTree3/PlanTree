import './App.css'
import logo from '../public/plantree.png'

const App = () => {
  // 이거 안 하면 린트가 지 맘대로 중괄호랑 리턴이랑 다 죽여버려서
  // 리턴 밖에 변수 하나 해두었습니다
  const a = logo
  return (
    <>
      <img className="logo" src={a} alt="a" />
      <h1 className="text-5xl text-blue-300 font-bold">Hey!</h1>
    </>
  )
}
export default App
