import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addName } from '@/stores/features/signupSlice'

const UserName = () => {
  const dispatch = useDispatch()
  const [inputName, setInputName] = useState<string>('')
  const [inputCount, setInputCount] = useState<number>(0)

  // 이름이 10글자를 넘어갈 때 스와이프 안되게 하는 함수는 부모 컴포(SignUpPage)에서 실행
  // 예지바봉

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
    <>
      <div>저는 이런 사람입니다!</div>
      <div>
        <div>제 이름은</div>
        <input type="text" value={inputName} onChange={onInputHandler} />
      </div>
      <div>
        {inputCount <= 10 ? (
          <>
            <span>{inputCount}</span>
            <span>/10</span>
          </>
        ) : (
          <span>이름은 10자를 넘을 수 없습니다.</span>
        )}
      </div>
      <div>입니다.</div>
    </>
  )
}

export default UserName
