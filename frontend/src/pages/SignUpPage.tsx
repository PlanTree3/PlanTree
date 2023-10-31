import React, { useState } from 'react'
import { debounce } from 'redux-saga/effects'

const SignUpPage = () => {
  const [inputName, setInputName] = useState<string>('')
  const [inputCount, setInputCount] = useState<number>(0)

  // debounce 함수를 사용하여 GET 요청을 보내는 함수
  const debounceSearch = debounce(async (name: string) => {

    if(name.length > 0) {
      const response = await a
    }
  })
  return <div>저는 이런 사람입니다!</div>
}

export default SignUpPage
