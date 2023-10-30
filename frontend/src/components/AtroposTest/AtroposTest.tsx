import Atropos from 'atropos/react'
import './AtroposTest.css'
import logo from '../../../public/plantree2.jpg'

const AtroposTest = () => {
  const b = logo

  return (
    <div>
      <Atropos
        // style={{
        //   width: '320px',
        //   height: '320px',
        // }}
        activeOffset={40}
        shadowScale={0}
        onEnter={() => console.log('Enter')}
        onLeave={() => console.log('Leave')}
        onRotate={(x, y) => console.log('Rotate', x, y)}
      >
        <img src={b} alt="a" data-atropos-offset="-5" />

        <img src={b} alt="a" data-atropos-offset="0" />

        <img src={b} alt="c" data-atropos-offset="5" />
      </Atropos>

      <h1 className="text-5xl text-blue-300 font-bold">Hey!</h1>

      <div className="my-atropos">
        <Atropos>
          <div className="atropos-component">
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
              <div data-atropos-offset="6" className="atropos-button-wrap">
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
        </Atropos>
      </div>
    </div>
  )
}

export default AtroposTest
