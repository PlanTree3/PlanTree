import './SignUp.scss'
import { useDispatch } from 'react-redux'
import { addRole } from '@/stores/features/signupSlice'
import Button from '../Button/Button'

import '@/components/Button/Button.css'

const UserRole = () => {
  const dispatch = useDispatch()

  const rolesEO: string[] = ['STUDENT', 'PARENT', 'TEACHER']

  const setRole = (role: string) => {
    dispatch(addRole(role))
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
    <>
      <div>저는</div>
      {rolesEO.map((role: string, idx) => (
        <Button
          className="brown normal button"
          onClick={() => setRole(rolesEO[idx])}
          label={showRole(role)}
        />
      ))}
      <div>입니다.</div>
    </>
  )
}

export default UserRole
