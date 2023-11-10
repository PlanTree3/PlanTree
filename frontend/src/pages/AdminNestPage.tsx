import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import './GroupPage.css'
import Button from '@/components/Button/Button'
import pencil from '../../public/pencil.png'
import Modal from '@/components/Button/Modal'
import yeji1 from '../../public/yeji1.png'
import gijeong1 from '../../public/gijeong1.png'
import forest from '../../public/forest_tmp.png'
// import { divide } from 'lodash'
import { nestNameUpdate, nestStudents } from '@/apis'

const AdminNestPage = () => {
  const [page, setPage] = useState(1)
  const [pencilModalIsOpen, setPencilModalIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [inputNestName, setInputNestName] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  // const GroupsPerPage = 5

  // const indexOfLastGroup = currentPage * GroupsPerPage
  // const indexOfFirstGroup = indexOfLastGroup - GroupsPerPage
  // const currentGroups = dummyData.data.groups.slice(
  //   indexOfFirstGroup,
  //   indexOfLastGroup,
  // )

  // const totalPages = Math.ceil(dummyData.data.groups.length / GroupsPerPage)

  // const pageNumbers = []
  // for (let i = 1; i <= totalPages; i += 1) {
  //   pageNumbers.push(i)
  // }

  // const changePage = (page: number) => {
  //   setCurrentPage(page)
  // }
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const openPencilModal = () => {
    setPencilModalIsOpen(true)
  }

  const closePencilModal = () => {
    setPencilModalIsOpen(false)
  }

  const handleNestNameInputChange = (e) => {
    setInputNestName(e.target.value)
  }

  const handleNestName = async () => {
    const data = {
      nestName: inputNestName,
    }
    try {
      const nestId = '1'
      const response = await nestNameUpdate(data)
      console.log('둥지이름 업뎃', response)
    } catch (error) {
      console.error('둥지이름 업뎃 에러', error)
    }
    setPencilModalIsOpen(false)
  }

  //둥지의 학생 리스트 조회
  const handleGetNestDetail = async () => {
    console.log('1')
    try {
      console.log('2')
      const response = await nestStudents()
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    handleGetNestDetail()
  }, [])

  return (
    <div>
      <div className="font-semibold text-2xl">예지의 푸릇푸릇한 둥지</div>
      <img className="mx-4" src={pencil} alt="" onClick={openPencilModal} />
      <h2 className="font-semibold text-l">그룹장: 정도현</h2>
      <div className="studentBox">
        <div className="circle-image">
          <img src={yeji1} alt="" />/
        </div>
        <div className="flex flex items-center">
          <text>정예지</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>12/25</text>
        </div>
        <div>
          <Link to="/forest/1">
            <img className="forest" src={forest} alt="" />
          </Link>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-image">
          <img src={gijeong1} alt="" />/
        </div>
        <div className="flex flex items-center">
          <text>신기정</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>12/25</text>
        </div>
        <div>
          <Link to="/forest/1">
            <img className="forest" src={forest} alt="" />
          </Link>
        </div>
      </div>
      <Button className="primary" onClick={openModal} label="둥지원 추가하기" />
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
          그룹 이름 변경
        </h1>
        <input
          type="text"
          value={inputNestName}
          onChange={handleNestNameInputChange}
          placeholder="그룹 이름을 수정하세요"
        />
        <Button onClick={handleNestName} className="primary" label="저장" />
      </ReactModal>
    </div>
  )
}

export default AdminNestPage
