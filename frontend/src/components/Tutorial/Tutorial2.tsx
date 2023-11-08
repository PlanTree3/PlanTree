import './Tutorial.scss'

const Tutorial2 = () => {
  return (
    <div>
      <div className="tutorialImg">
        <div
          className={`bg-[url('src/asset/tutorial/flower.png')] w-16 h-20 bg-cover`}
        />
        <div className="p-4">
          <div>할 일로</div> <div>봉우리를 만들어 보아요!</div>
        </div>
      </div>
      <div className="tutorialImg">
        <div
          className={`bg-[url('src/asset/tutorial/Seed.png')] w-16 h-20 bg-cover`}
        />
        <div className="p-4">
          <div>한 주 시작은 새싹부터!</div>{' '}
          <div>무럭무럭 자란 나무가 보고 싶지 않나요?</div>
        </div>
      </div>
      <div>
        <div
          className={`bg-[url('src/asset/tutorial/appleTree.png')] w-16 h-20 bg-cover`}
        />
        <div className="p-4">
          <div>계획한 일을 열심히 했더니</div>{' '}
          <div> 일주일만에 커다란 나무가!</div>
        </div>
      </div>
      <div>
        <div
          className={`bg-[url('src/asset/tutorial/forest.png')] w-16 h-20 bg-cover`}
        />
        <div className="p-4">
          <div>나무들이 모여</div> <div>어느새 숲이 되었어요!</div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial2
