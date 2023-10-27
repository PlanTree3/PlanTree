import './App.css'
import logo from '../public/plantree.png'
import AtroposTest from './components/AtroposTest/AtroposTest.tsx'

const App = () => {
  // 이거 안 하면 린트가 지 맘대로 중괄호랑 리턴이랑 다 죽여버려서
  // 리턴 밖에 변수 하나 해두었습니다
  const a = logo

  return (
    <>
      <h1>asdf</h1>
      <img className="logo" src={a} alt="a" />
      <AtroposTest />
    </>
  )
}
export default App
