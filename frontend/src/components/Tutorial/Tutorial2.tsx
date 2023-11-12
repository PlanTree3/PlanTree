// import { Tree } from '..'
import './Tutorial.scss'

const Tutorial2 = () => {
  return (
    <div className="tutorial-2-container">
      <img src="/tutorial/flower.png" />
      <div className="p-4">
        <div>할 일로</div> <div>봉오리를 만들어 보아요!</div>
      </div>
      <img src="/tutorial/Seed.png" />
      {/* <Tree degree={10} /> */}
      <div className="p-4">
        <div>한 주 시작은 새싹부터!</div>{' '}
        <div>무럭무럭 자란 나무가 보고 싶지 않나요?</div>
      </div>
      <img src="/tutorial/appleTree.png" alt="" />
      {/* <Tree degree={70} /> */}
      <div className="p-4">
        <div>계획한 일을 열심히 했더니</div>{' '}
        <div> 일주일만에 커다란 나무가!</div>
      </div>
      <img src="/tutorial/forest.png" />
      <div className="p-4">
        <div>나무들이 모여</div> <div>어느새 숲이 되었어요!</div>
      </div>
    </div>
  )
}

export default Tutorial2
