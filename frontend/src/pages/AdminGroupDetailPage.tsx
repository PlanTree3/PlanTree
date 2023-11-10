import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import QR from 'qrcode.react'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import pencil from '../../public/pencil.png'
import Button from '@/components/Button/Button'
import './GroupPage.css'
import { groupCreate, groupStudents } from '@/apis'

// type StudentList = {
//   students: GroupStudentListResponse;
// };

const AdminGroupDetailPage: React.FC<any> = ({ groupId }) => {
  // const [page, setPage] = useState(1)

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [QrmodalIsOpen, setQrModalIsOpen] = useState(false)
  const [pencilModalIsOpen, setPencilModalIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputGroupName, setInputGroupName] = useState('')
  // const studentsPerPage = 5;
  // const startIndex = (page - 1) * studentsPerPage;
  // const endIndex = startIndex + studentsPerPage;
  // const currentStudents = students.slice(startIndex, endIndex);

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  const openQrModal = () => {
    setQrModalIsOpen(true)
  }

  const closeQrModal = () => {
    setQrModalIsOpen(false)
  }
  const openPencilModal = () => {
    setPencilModalIsOpen(true)
  }

  const closePencilModal = () => {
    setPencilModalIsOpen(false)
  }

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputValue(e.target.value)
  }
  const handleGroupNameInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputGroupName(e.target.value)
  }

  const handleCreateBranch = () => {
    // api
    setModalIsOpen(false)
  }

  // 그룹이름 수정
  const handleGroupName = async () => {
    const data = {
      groupName: inputGroupName,
    }
    try {
      // const groupId = '1'
      const response = await groupCreate(groupId, data)
      console.log('그룹이름 업뎃', response)
    } catch (error) {
      console.error('그룹이름 업뎃 에러', error)
    }
    setPencilModalIsOpen(false)
  }
  // 교사의 그룹 학생 리스트 조회
  const handleGetGroupDetail = async () => {
    console.log('1')
    try {
      console.log('2')
      const response = await groupStudents
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    handleGetGroupDetail()
  }, [])

  // const previousPage = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };

  // const nextPage = () => {
  //   if (endIndex < students.length) {
  //     setPage(page + 1);
  //   }
  // };

  // const customModalStyles = {
  //   overlay: {
  //     className: 'custom-overlay',
  //   },
  //   content: {
  //     className: 'custom-content',
  //   },
  // }

  return (
    <div>
      <div className="flex flex-row">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <div className="font-semibold text-2xl"> '현재 그룹 이름'의 그룹원</div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <img className="mx-4" src={pencil} onClick={openPencilModal} />
        <Button
          label="가지 일괄 등록"
          className="primary"
          onClick={openModal}
        />
        <Link to="/adminGroupRequest">
          <Button label="가입요청 리스트 확인하기" className="gray" />
        </Link>
        <Button label="그룹원 추가하기" className="red" onClick={openQrModal} />
        <ReactModal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeModal}
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
            가지 일괄 등록
          </h1>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="입력하세요"
          />
          <button onClick={handleCreateBranch}>저장</button>
        </ReactModal>
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
            value={inputGroupName}
            onChange={handleGroupNameInputChange}
            placeholder="그룹 이름을 수정하세요"
          />
          <button onClick={handleGroupName}>저장</button>
        </ReactModal>
        <ReactModal
          isOpen={QrmodalIsOpen}
          ariaHideApp={false}
          onRequestClose={closeQrModal}
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
              width: '80%',
              height: '80%',
              border: '2px solid #000',
              borderRadius: '10px',
              overflow: 'auto',
              background: '#F5F5DC',
              boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <h1> QR을 찍어 그룹원을 추가해 보세요.</h1>
          <QR
            value={`https://k9a302a.p.ssafy.io/api/member-service/group/${groupId}/join-request`}
            size={300}
            id="qr-gen"
            includeMargin={false}
          />
        </ReactModal>
      </div>
      {/* <div className="box-border h-2/3 w-2/3 p-5 border-4 bg-amber-700 rounded-3xl">
    {currentStudents.map((student) => (
          <div key={student.studentId} className="student-box">
            <p>학생 ID: {student.studentId}</p>
            <p>학생 이름: {student.studentName}</p>
            <p>진행한 버드 수: {student.completedBudCount}</p>
            <p>전체 버드 수: {student.totalBudCount}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default AdminGroupDetailPage
