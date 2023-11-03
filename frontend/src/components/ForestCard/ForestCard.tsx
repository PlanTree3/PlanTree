import Atropos from 'atropos/react'
import './ForestCard.css'
import { useNavigate } from 'react-router-dom'
import skyImage from '../../../public/atropos/sun-3588618_1280.jpg'
import mountainImage from '../../../public/atropos/mountains.svg'
import forestFront from '../../../public/atropos/forest-front.svg'
import forestMid from '../../../public/atropos/forest-mid.svg'
import forestBack from '../../../public/atropos/forest-back.svg'
import Button from '../Button/Button'

interface ForestProps {
  forestName: string
  nav: number
}

const ForestCard = ({ forestName, nav }: ForestProps) => {
  const navigate = useNavigate()
  const routeForestDetail = () => {
    navigate(`/forest/${nav}`)
  }
  return (
    <Atropos className="atropos">
      <div className="atropos-component">
        <div className="atropos-inner">
          <img className="atropos-spacer" src={skyImage} alt="sky" />
          <img data-atropos-offset="-4.5" src={skyImage} alt="sky" />
          <img data-atropos-offset="-6" src={mountainImage} alt="mountains" />
          <img data-atropos-offset="-4" src={forestBack} alt="forest" />
          <img data-atropos-offset="-2" src={forestMid} alt="forest" />
          <img data-atropos-offset="0" src={forestFront} alt="forest" />
          <div data-atropos-offset="3" className="forest-text">
            {forestName}
            <Button
              className="xsmall primary"
              onClick={routeForestDetail}
              label="자세히 보기"
            />
          </div>
        </div>
        <div className="atropos-shadow" />
      </div>
    </Atropos>
  )
}

export default ForestCard
