import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import QR from 'qrcode.react'
import ReactModal from 'react-modal'
import './GroupPage.css'
import Button from '@/components/Button/Button'
import pencil from '../../public/pencil.png'
import Modal from '@/components/Button/Modal'
import yeji1 from '../../public/yeji1.png'
import gijeong1 from '../../public/gijeong1.png'
import forest from '../../public/forest_tmp.png'
// import { divide } from 'lodash'
import { nestCheck, nestCreate, nestDelete, nestNameUpdate, nestStudents } from '@/apis'

const AdminNestPage = () => {
  const [page, setPage] = useState(1)
  const [pencilModalIsOpen, setPencilModalIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // const [createModalisOpen, setCreateModalisOpen] = useState(false)
  const [inputNestName, setInputNestName] = useState('')
  const [studentsData, setStudentsData] = useState<any>(null)
  const [parentsData, setParentsData] = useState<any>(null)
  const [nestData, setNestData] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  
  const studentsPerPage = 5;
  const startIndex = (page - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = studentsData?.slice(startIndex, endIndex) || [];

  const totalPages = studentsData?
    Math.ceil(studentsData.length / studentsPerPage)
    : 0

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i)
  }
  const changePage = (page: number) => {
    setCurrentPage(page)
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
  const data = { groupName: inputNestName }
  const handleCreateNest = async () => {
    console.log('여기까진??')
    try {
      console.log('이것도 되지?')
      const response = await nestCreate(data)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
    setIsOpen(false)
  }

  // 둥지 조회(둥지의 유무를 먼저 확인)
  const handleNestCheck = async () => {
    try {
      const response = await nestCheck();
      console.log('둥지 조회', response);
      if (response.data && response.data.data.nest) {
        setNestData(response.data.data.nest);
        setParentsData(response.data.data.nest.parents)
        console.log(parentsData);
        handleGetNestDetail()
        console.log('여기는?');
      } else {
        setNestData(null);
      }
    } catch (error) {
      console.error('둥지 조회 에러', error);
    }
  };

  // 둥지 이름 변경
  const handleNestName = async () => {
    const nestId = nestData.nestId
    const data = {
      nestName: inputNestName,
    }
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
    const nestId = nestData.nestId
    try {
      const response = await nestDelete(nestId)
      console.log('둥지 삭제', response)
    } catch (error) {
      console.error('둥지 삭제 에러', error)
    }
  }

  //둥지의 학생 리스트 조회
  const handleGetNestDetail = async () => {
    const nestId = nestData.nestId
    console.log('정보확인', nestData)
    try {
      console.log('학생 리스트 조회')
      const response = await nestStudents(nestId)
      console.log('Response:', response)
      setStudentsData(response.data.data.students)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    handleNestCheck()
  }, [])

  return (
    <div>
    {!nestData ? (
      <div>
       <div className="font-semibold text-2xl">둥지가 없습니다.</div>
          <Button className="primary" onClick={openModal} label="둥지 생성하기" />
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
      <div className="font-semibold text-2xl">{nestData.nestName}</div>
      <img className="mx-4" src={pencil} alt="" onClick={openPencilModal} />
      <div className="font-semibold text-l">그룹장: </div>
      {parentsData.length > 0 ? (
    parentsData.map((parent: any) => (
      <p className="font-semibold text-l">{parent}</p> ))
      ):(
        <p>둥지장이 없는 경우는 없을 수 없음. 비상!</p>
      )}

      {currentStudents.length > 0 ? (
    currentStudents.map((student: any) => (
      <div key={student.studentId} className="studentBox">
        {/* <div className="circle-image">
          <img src={yeji1} alt="" />/
        </div> */}
        <div className="flex flex items-center">
          <text>{student.studentName}</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>{student.completedBudCount}/{student.totalBudCount}</text>
        </div>
        <div>
          <Link to="/forest/1">
            <img className="forest" src={forest} alt="" />
          </Link>
        </div>
      </div>
      ))
      ) : (
        <p>현재 그룹원이 없습니다.</p>
      )}


      <Button className="primary" onClick={openModal} label="둥지원 추가하기" />
      <br/>
      <Button className="red" onClick={handleNestDelete} label="둥지 삭제" />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        content={<div>QR을 찍어 둥지에 가입해보세요!</div>}
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
<div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => changePage(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  )}
  </div>
  )
}

export default AdminNestPage
