import Atropos from 'atropos/react'
import './ForestCard.css'
import skyImage from '../../../public/atropos/sun-3588618_1280.jpg'
import mountainImage from '../../../public/atropos/mountains.svg'
import forestFront from '../../../public/atropos/forest-front.svg'
import forestMid from '../../../public/atropos/forest-mid.svg'
import forestBack from '../../../public/atropos/forest-back.svg'

interface ForestProps {
  forestName: string
}

const ForestCard = ({ forestName }: ForestProps) => {
  return (
    <div>
      <div className="my-atropos">
        <Atropos>
          <div className="atropos-component">
            <div className="atropos-inner">
              <img className="atropos-spacer" src={skyImage} alt="sky" />
              <img data-atropos-offset="-4.5" src={skyImage} alt="sky" />
              <img
                data-atropos-offset="-6"
                src={mountainImage}
                alt="mountains"
              />
              <img data-atropos-offset="-4" src={forestBack} alt="forest" />
              <img data-atropos-offset="-2" src={forestMid} alt="forest" />
              <img data-atropos-offset="0" src={forestFront} alt="forest" />
              <div data-atropos-offset="3" className="forest-text">
                <a
                  href="https://atroposjs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {forestName}
                </a>
              </div>
            </div>
            <div className="atropos-shadow" />
          </div>
        </Atropos>
      </div>
      {/* <div className="my-atropos">
        <Atropos>
          <div className="atropos-component">
            <div className="atropos-inner">
              <img className="atropos-spacer" src={skyImage} alt="stars" />
              <img data-atropos-offset="-4.5" src={skyImage} alt="stars" />
              <img
                data-atropos-offset="-6"
                src="https://atroposjs.com/images/header/atropos-mountains.svg"
                alt="mountains"
              />
              <img
                data-atropos-offset="-4"
                src="https://atroposjs.com/images/header/atropos-forest-back.svg"
                alt="forest"
              />
              <img
                data-atropos-offset="-2"
                src="https://atroposjs.com/images/header/atropos-forest-mid.svg"
                alt="forest"
              />
              <img
                data-atropos-offset="0"
                src="https://atroposjs.com/images/header/atropos-forest-front.svg"
                alt="forest"
              />
              <img
                data-atropos-offset="3"
                src="https://atroposjs.com/images/header/atropos-logo-en.svg"
                alt="atropos logo"
              />
              <div data-atropos-offset="3" className="atropos-button-wrap">
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
      </div> */}
    </div>
  )
}

export default ForestCard
