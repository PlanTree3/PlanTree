import { useState } from 'react'
import './SignUp.scss'
import { useDispatch } from 'react-redux'
import { addRole } from '@/stores/features/signupSlice'
import Button from '../Button/Button'

import '@/components/Button/Button.css'

const UserRole = () => {
  const dispatch = useDispatch()

  const [selected, setSelected] = useState('')

  const rolesEO: string[] = ['STUDENT', 'PARENT', 'TEACHER']

  const setRole = (role: string) => {
    dispatch(addRole(role))
    setSelected(role)
  }

  const showRole = (role: string) => {
    let roleKO = ''

    switch (role) {
      case 'STUDENT':
        roleKO = '학생'
        break
      case 'TEACHER':
        roleKO = '선생님'
        break
      case 'PARENT':
        roleKO = '학부모'
        break
      default:
        roleKO = ''
    }

    return roleKO
  }

  return (
    <div className="user-name-container">
      <div className="user-name-is">저는</div>
      <div className="user-name-input">
        {rolesEO.map((role: string, idx) => (
          <Button
            className={`normal border-2 border-lime-500 ${
              selected === role && 'lime'
            }`}
            onClick={() => setRole(rolesEO[idx])}
            label={showRole(role)}
          />
        ))}
      </div>
      <div className="user-name-desu">입니다.</div>
    </div>
  )
}

export default UserRole
