import './App.css'
// eslint-disable-next-line import/no-unresolved
import Atropos from 'atropos/react'
import logo from '../public/plantree.png'
import logo2 from '../public/plantree2.jpg'

const App = () => {
  // 이거 안 하면 린트가 지 맘대로 중괄호랑 리턴이랑 다 죽여버려서
  // 리턴 밖에 변수 하나 해두었습니다
  const a = logo
  const b = logo2
  return (
    <>
      <img className="logo" src={a} alt="a" />
      <Atropos
        // style={{
        //   width: '320px',
        //   height: '320px',
        // }}
        activeOffset={40}
        shadowScale={1.05}
        onEnter={() => console.log('Enter')}
        onLeave={() => console.log('Leave')}
        onRotate={(x, y) => console.log('Rotate', x, y)}
      >
        <img src={b} alt="a" data-atropos-offset="-5" />

        <img src={b} alt="a" data-atropos-offset="0" />

        <img src={b} alt="c" data-atropos-offset="5" />
      </Atropos>

      <h1 className="text-5xl text-blue-300 font-bold">Hey!</h1>

      <div className="container">
        <Atropos>
          <atropos-component>
            <div className="atropos">
              <div className="atropos-scale">
                <div className="atropos-rotate">
                  <div className="atropos-inner">
                    <img
                      className="atropos-spacer"
                      src="https://atroposjs.com/images/header/atropos-bg.svg"
                      alt="stars"
                    />
                    <img
                      data-atropos-offset="-4.5"
                      src="https://atroposjs.com/images/header/atropos-bg.svg"
                      alt="stars"
                    />
                    <img
                      data-atropos-offset="-2.5"
                      src="https://atroposjs.com/images/header/atropos-mountains.svg"
                      alt="mountains"
                    />
                    <img
                      data-atropos-offset="0"
                      src="https://atroposjs.com/images/header/atropos-forest-back.svg"
                      alt="forest"
                    />
                    <img
                      data-atropos-offset="2"
                      src="https://atroposjs.com/images/header/atropos-forest-mid.svg"
                      alt="forest"
                    />
                    <img
                      data-atropos-offset="4"
                      src="https://atroposjs.com/images/header/atropos-forest-front.svg"
                      alt="forest"
                    />
                    <img
                      data-atropos-offset="5"
                      src="https://atroposjs.com/images/header/atropos-logo-en.svg"
                      alt="atropos logo"
                    />
                    <div
                      data-atropos-offset="6"
                      className="atropos-button-wrap"
                    >
                      <a
                        href="https://atroposjs.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                  <div className="atropos-shadow" />
                </div>
              </div>
            </div>
          </atropos-component>
        </Atropos>
      </div>
    </>
  )
}
export default App
