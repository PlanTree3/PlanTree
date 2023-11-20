import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addName } from '@/stores/features/signupSlice'

const UserName = () => {
  const dispatch = useDispatch()
  const [inputName, setInputName] = useState<string>('')
  const [inputCount, setInputCount] = useState<number>(0)

  // 이름 세는 함수
  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length >= 0 && value.length <= 10) {
      setInputName(value)
      setInputCount(value.length)
      dispatch(addName(value))
    }
    setInputCount(value.length)
  }

  return (
    <div className="user-name-container">
      <div className="user-name-is">제 이름은</div>
      <div className="user-name-input">
        <input
          type="text"
          value={inputName}
          onChange={onInputHandler}
          placeholder="이름 입력"
        />
        <span className="">{inputCount}/10</span>
      </div>
      <div className="user-name-desu">입니다.</div>
    </div>
  )
}

export default UserName
