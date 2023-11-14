import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import QR from 'qrcode.react'
import ReactModal from 'react-modal'
import './GroupPage.scss'
import Button from '@/components/Button/Button'
import pencil from '../../public/pencil.png'
import Modal from '@/components/Button/Modal'
import forest from '../../public/forest_tmp.png'
// import { divide } from 'lodash'
import {
  nestCheck,
  nestCreate,
  nestDelete,
  nestNameUpdate,
  nestStudents,
} from '@/apis'
import { LoginCheck } from '@/components'

const AdminNestPage = () => {
  const [page, setPage] = useState(1)
  const [pencilModalIsOpen, setPencilModalIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [inputNestName, setInputNestName] = useState('')
  const [studentsData, setStudentsData] = useState<any>(null)
  const [nestData, setNestData] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const studentsPerPage = 4
  const startIndex = (page - 1) * studentsPerPage
  const endIndex = startIndex + studentsPerPage
  const currentStudents = studentsData?.slice(startIndex, endIndex) || []

  const totalPages = studentsData
    ? Math.ceil(studentsData.length / studentsPerPage)
    : 0

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i)
  }
  const changePage = (p: number) => {
    setCurrentPage(p)
  }

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  // const openCreateModal = () => {
  //   setCreateModalisOpen(true)
  // }
  // const closeCreateModal = () => {
  //   setCreateModalisOpen(false)
  // }

  const openPencilModal = () => {
    setPencilModalIsOpen(true)
  }

  const closePencilModal = () => {
    setPencilModalIsOpen(false)
  }

  const handleNestNameInputChange = (e) => {
    setInputNestName(e.target.value)
  }

  //둥지 생성
  const handleCreateNest = async () => {
    const data = { nestName: inputNestName }
    try {
      const response = await nestCreate(data)
      console.log('둥지 생성 응답:', response)
    } catch (error) {
      console.error('둥지 생성 에러:', error)
    }
    setIsOpen(false)
  }

  //둥지의 학생 리스트 조회
  const handleGetNestDetail = async (nestId: string) => {
    console.log('정보확인', nestId)
    try {
      const response = await nestStudents(nestId)
      console.log('학생 리스트 조회', response)
      setStudentsData(response.data.data.students)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // 둥지 조회(둥지의 유무를 먼저 확인)
  const handleNestCheck = async () => {
    try {
      const response = await nestCheck()
      // console.log('둥지 조회', response)
      // console.log('둥지 조회2', response.data.data.nest)
      if (response.data && response.data.data.nest) {
        setNestData(response.data.data.nest)
        console.log('둥지 조회 2.4', response.data.data.nest)
        // console.log('둥지 조회3', nestData)
        handleGetNestDetail(response.data.data.nest.nestId)
      } else {
        console.log('둥지 없음')
        setNestData(null)
      }
    } catch (error) {
      console.error('둥지 조회 에러', error)
    }
  }

  // 둥지 이름 변경
  const handleNestName = async () => {
    const { nestId } = nestData
    const data = {
      nestName: inputNestName,
    }
    console.log('inputNestName', inputNestName)
    try {
      const response = await nestNameUpdate(nestId, data)
      console.log('둥지이름 업뎃', response)
    } catch (error) {
      console.error('둥지이름 업뎃 에러', error)
    }
    setPencilModalIsOpen(false)
  }

  //둥지 삭제
  const handleNestDelete = async () => {
    const { nestId } = nestData
    try {
      const response = await nestDelete(nestId)
      console.log('둥지 삭제', response)
    } catch (error) {
      console.error('둥지 삭제 에러', error)
    }
  }

  useEffect(() => {
    handleNestCheck()
  }, [])

  // useEffect(() => {
  //   handleNestCheck()
  // }, [])

  const nestId = nestData?.nestId

  return (
    <div>
      {!nestData ? (
        <div>
          <div className="font-semibold text-2xl">둥지가 없습니다.</div>
          <Button
            className="primary"
            onClick={openModal}
            label="둥지 생성하기"
          />
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            content={
              <div>
                <div>그룹명을 입력해주세요</div>
                <input
                  placeholder="ex. 2023 3학년 2반"
                  maxLength={50}
                  onChange={(e) => setInputNestName(e.target.value)}
                  onKeyDown={handleNestNameInputChange}
                />
                <Button
                  className="primary"
                  label="생성하기"
                  onClick={handleCreateNest}
                />
                <Button
                  className="primary ml-4"
                  label="취소"
                  onClick={closeModal}
                />
              </div>
            }
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-row">
            <div className="font-semibold text-4xl">{nestData.nestName}</div>
            <img
              className="mx-4"
              src={pencil}
              alt=""
              onClick={openPencilModal}
              tabIndex={0}
            />
          </div>
          <div className="font-semibold text-l">둥지장: </div>
          {nestData.parents.length > 0 ? (
            nestData.parents.map((parent: any) => (
              <p className="font-semibold text-lg">{parent}</p>
            ))
          ) : (
            <p>둥지장이 없는 경우는 없을 수 없음. 비상!</p>
          )}

          {currentStudents.length > 0 ? (
            currentStudents.map((student: any) => (
              <div key={student.studentId} className="studentBox">
                <div className="flex flex-1 items-center flex justify-center">
                  <text className="studentFont">{student.studentName}</text>
                </div>
                <div className="flex-1 flex-col flex justify-center items-center ">
                  <text className="studentFont">달성도</text>
                  <text className="studentFont">
                    {student.completedBudCount}/{student.totalBudCount}
                  </text>
                </div>
                <div className="bg flex-1 grid justify-items-end">
                  <Link to="/forest/1">
                    <img className="forest" src={forest} alt="" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>현재 그룹원이 없습니다.</p>
          )}
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button key={number} onClick={() => changePage(number)}>
                {number}
              </button>
            ))}
          </div>
          <Button
            className=" normal primary"
            onClick={openModal}
            label="둥지원 추가하기"
          />
          <br />
          <Button
            className="normal red"
            onClick={handleNestDelete}
            label="둥지 삭제"
          />
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            content={
              <div>
                <div>QR을 찍어 둥지에 가입해보세요!</div>
                <QR
                  // value={`https://k9a302a.p.ssafy.io/nestJoin/${nestId}`}
                  value={`https://http://localhost:3000/nestJoin/${nestId}`}
                  size={300}
                  id="qr-gen"
                  includeMargin={false}
                />
              </div>
            }
          />
          <ReactModal
            isOpen={pencilModalIsOpen}
            ariaHideApp={false}
            onRequestClose={closePencilModal}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                width: '100%',
                height: '100vh',
                zIndex: 10,
                top: 0,
                left: 0,
              },
              content: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                height: '40%',
                border: '2px solid #000',
                borderRadius: '10px',
                overflow: 'auto',
                background: '#F5F5DC',
                boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <h1 className="flex justify-center h-[20%] items-center text-2xl bg-lime-100 rounded-[10px]">
              둥지 이름 변경
            </h1>
            <input
              type="text"
              value={inputNestName}
              onChange={handleNestNameInputChange}
              placeholder="둥지 이름을 수정하세요"
            />
            <Button onClick={handleNestName} className="primary" label="저장" />
          </ReactModal>
        </div>
      )}
    </div>
  )
}

export default LoginCheck(AdminNestPage)
