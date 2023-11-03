import { MouseEvent } from 'react'
import './Button.css'

interface ButtonProps {
  label: string | JSX.Element
  className?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ label, className, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
