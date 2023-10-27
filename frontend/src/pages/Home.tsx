import logo from '../../public/plantree.png'

const Home = () => {
  const testCode = '홈페이지'
  console.log(testCode)
  return (
    <>
      <img className="logo" src={logo} alt="logo" />
      <h1 className="text-5xl text-blue-300 font-bold">Hey!</h1>
    </>
  )
}

export default Home
